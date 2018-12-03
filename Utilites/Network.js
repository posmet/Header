import React from 'react';
import { observable, computed } from "mobx";
import * as mobx from 'mobx';
import { observer } from "mobx-react";
import { AsyncStorage, Platform } from 'react-native';
import Frisbee from 'frisbee';
import Config from './../constants/Config';
import PouchDB from 'pouchdb-react-native';

class Network extends React.Component {

  @observable monitorList = [];
  @observable pharmsList = [];
  @observable pharmsList2 = [];
  @observable reportsList = [];
  @observable commonReportsList = [];

  constructor(props) {
    super(props);
    mobx.autorun(() => {});
  }
}

const network = new Network();
export default network;

const api = new Frisbee({
  baseURI: Config.apiDomain,
  headers: {
    // 'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

const google = new Frisbee({
  baseURI: 'https://maps.googleapis.com',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

export function getRoute(fromLat, fromLng, toLat, toLng) {
  return new Promise(function(resolve, reject) {
    google.get('/maps/api/directions/json?origin=' + fromLat + ',' + fromLng + '&destination=' + toLat + ',' + toLng + '&key=AIzaSyDgCoqpAGimcZAHaHFtoyjOJDrjM0EAHBo', {
    })
    .then((response) => {
      console.log('body: ' + JSON.stringify(response.body));
      // let body = JSON.parse(response.body);
      // console.log('body: ' + JSON.stringify(body));
      // console.log('blocks: ' + body.blocks);
      // network.monitorList = body.blocks;
      resolve();
    }).catch((error) => {
      console.log('err='+error);
      reject('Неизвестная ошибка. Повторите снова.');
    });
  });
}

export function login(login, password) {
  return new Promise(function(resolve, reject) {
    api.post('/auth', {
      body: {
        username: login,
        password: password,
      }
    })
    .then((response) => {
      console.log('body22: ' + JSON.stringify(response));
      if(response.body.err === 'forbiden') {
        reject('Логин и пароль не верны!');
        AsyncStorage.setItem('@MySuperStore:login', '');
        AsyncStorage.setItem('@MySuperStore:password', '');
      } else {
        AsyncStorage.setItem('@MySuperStore:login', login);
        AsyncStorage.setItem('@MySuperStore:password', password);
        resolve();
      }
    }).catch((error) => {
      console.log('err='+error);
      AsyncStorage.setItem('@MySuperStore:login', '');
      AsyncStorage.setItem('@MySuperStore:password', '');
      reject('Неизвестная ошибка. Повторите снова.');
    });
  });
}

export function getMonitor() {
  return new Promise(function(resolve, reject) {
    api.get('/monitor', {
    })
    .then((response) => {
      let body = JSON.parse(response.body);
      // console.log('monitor body: ' + JSON.stringify(body));
      // // console.log('body: ' + JSON.stringify(body));
      // // console.log('blocks: ' + body.blocks);
      network.monitorList = body.blocks;
      resolve();
    }).catch((error) => {
      console.log('err='+error);
      reject('Неизвестная ошибка. Повторите снова.');
    });
  });
}

export function signout() {
  return new Promise(function(resolve, reject) {
    api.get('/signout', {
    })
    .then((response) => {
      console.log('signout: ' + JSON.stringify(response));
      AsyncStorage.setItem('@MySuperStore:login', '');
      AsyncStorage.setItem('@MySuperStore:password', '');
      resolve();
    }).catch((error) => {
      console.log('err='+error);
      reject('Неизвестная ошибка. Повторите снова.');
    });
  });
}

export function searchPharms(text) {
  return new Promise(function(resolve, reject) {
    let array = network.pharmsList2;
    let result = array.filter(obj => obj.name.indexOf(text) != -1);
    let result2 = array.filter(obj => obj.id.toString().indexOf(text) != -1);

    for(let i=0;i<result2.length;i++) {
      let isExist = false;
      for(let y=0;y<result.length;y++) {
        if(result2[i].id == result[y].id) {
          isExist = true;
          break;
        }
      }
      if(!isExist) {
        result.push(result2[i]);
      }
    }

    network.pharmsList = result;
    resolve();
  });
}

export function getPharms() {
  return new Promise(function(resolve, reject) {
    api.get('/pharms', {
    })
    .then((response) => {
      // console.log('body: ' + JSON.stringify(response));
      let body = JSON.parse(response.body);
      network.pharmsList = body.list;
      network.pharmsList2 = body.list;
      resolve();
    }).catch((error) => {
      console.log('err='+error);
      reject('Неизвестная ошибка. Повторите снова.');
    });
  });
}

export function getPharmById(id) {
  return new Promise(function(resolve, reject) {
    api.get('/pharms/' + id, {
    })
    .then((response) => {
      console.log('body: ' + JSON.stringify(response.body));
      resolve(response.body);
    }).catch((error) => {
      console.log('err='+error);
      reject('Неизвестная ошибка. Повторите снова.');
    });
  });
}

export function getReportPharmById(reportId, pharmId) {
  return new Promise(function(resolve, reject) {
    api.get('/reportsph/' + reportId + '/' + pharmId, {
    })
    .then((response) => {
      console.log('body: ' + JSON.stringify(response));
      resolve(response.body);
    }).catch((error) => {
      console.log('err='+error);
      reject('Неизвестная ошибка. Повторите снова.');
    });
  });
}

export function getReportsApteka() {
  return new Promise(function(resolve, reject) {
    api.get('/reportsapt', {
    })
    .then((response) => {
      // console.log('body: ' + JSON.stringify(response));
      let body = JSON.parse(response.body);
      let list = body.list;
      const localDB = new PouchDB('reports');
      localDB.allDocs({
        include_docs: true,
      }).then((results) => {
        let array = [];
        for(var i=0;i<results.rows.length;i++) {
          array.push(results.rows[i].doc);
        }
        let newArray = [];
        for(let i=0;i<array.length;i++) {
          let objDB = array[i];
          let exist = false;
          for(let y=0;y<list.length;y++) {
            let obj = list[y];
            if(objDB.id == obj.id) {
              objDB.name = obj.name;
              objDB.group = obj.group;
              exist = true;
              break;
            }
          }
          if(!exist) {
            objDB._deleted = true;
          }
          newArray.push(objDB);
        }

        for(let i=0;i<list.length;i++) {
          let obj = list[i];
          let exist = false;
          for(let y=0;y<array.length;y++) {
            let obj2 = array[y];
            if(obj.id == obj2.id) {
              exist = true;
              break;
            }
          }
          if(!exist) {
            obj._id = obj.id.toString();
            obj.favor = false;
            newArray.push(obj);
          }
        }

        localDB.bulkDocs(newArray)
        .then(() => {
          getReportsAptekaFromDB()
          .then(() => {
            resolve();
          })
          .catch((err) => {
            reject();
          });
        })
        .catch((err) => {
          console.log('err '+err);
          getReportsAptekaFromDB()
          .then(() => {
            resolve();
          })
          .catch((err) => {
            reject();
          });
        });
      })
      .catch((err) => {
        console.log('err allDocs='+err);
        let array = [];
        for(var i=0;i < list.length;i++) {
          let obj = list[i];
          obj._id = obj.id.toString();
          obj.favor = false;
          array.push(obj);
        }
        localDB.bulkDocs(array)
        .then(() => {
          getReportsAptekaFromDB()
          .then(() => {
            resolve();
          })
          .catch((err) => {
            reject();
          });
        })
        .catch((err) => {
          network.reportsList = [];
          reject();
        });
      });
      // network.reportsList = body.list;
      // resolve();
    }).catch((error) => {
      console.log('err getReportsApteka='+error);
      reject('Неизвестная ошибка. Повторите снова.');
    });
  });
}

export function getReportsAptekaFromDB() {
  return new Promise(function(resolve, reject) {
    const localDB = new PouchDB('reports');
    localDB.allDocs({
      include_docs: true,
    }).then((results) => {
      let array = [];
      for(var i=0;i<results.rows.length;i++) {
        array.push(results.rows[i].doc);
      }
      sortCommonReports(array)
      .then((reports) => {
        network.reportsList = reports;
        resolve();
      });
    }).catch((err) => {
      console.log('err getReportsAptekaFromDB='+err);
      network.reportsList = [];
      reject(rows);
    });
  });
}

export function favorReport(id) {
  return new Promise(function(resolve, reject) {
    const localDB = new PouchDB('reports');
    localDB.get(id)
    .then((results) => {
      console.log('res='+JSON.stringify(results));
      results.favor = true;
      localDB.put(results)
      .then((response) => {
        getReportsAptekaFromDB()
        .then(() => {
          resolve();
        })
        .catch((err) => {
          reject();
        });
      })
      .catch((err) => {
        console.log('err2=' + err);
        reject();
      });
    })
    .catch((err) => {
      console.log('reports3');
      console.log('err='+err);
      reject();
    });
  });
}

export function unfavorReport(id) {
  return new Promise(function(resolve, reject) {
    const localDB = new PouchDB('reports');
    localDB.get(id)
    .then((results) => {
      console.log('res='+JSON.stringify(results));
      results.favor = false;
      localDB.put(results)
      .then((response) => {
        getReportsAptekaFromDB()
        .then(() => {
          resolve();
        })
        .catch((err) => {
          reject();
        });
      })
      .catch((err) => {
        console.log('err2=' + err);
        reject();
      });
    })
    .catch((err) => {
      console.log('reports3');
      console.log('err='+err);
      reject();
    });
  });
}


//===========================================================

export function getCommonReportById(reportId) {
  return new Promise(function(resolve, reject) {
    api.get('/reports/' + reportId, {
    })
    .then((response) => {
      console.log('body: ' + JSON.stringify(response));
      resolve(response.body);
    }).catch((error) => {
      console.log('err='+error);
      reject('Неизвестная ошибка. Повторите снова.');
    });
  });
}

export function getCommonReports() {
  return new Promise(function(resolve, reject) {
    api.get('/reports', {
    })
    .then((response) => {
      // console.log('common reports body: ' + JSON.stringify(response));
      let body = JSON.parse(response.body);
      let list = body.list;
      const localDB = new PouchDB('commonReports');
      localDB.allDocs({
        include_docs: true,
      }).then((results) => {
        // console.log('common: ' + JSON.stringify(results));
        let array = [];
        for(var i=0;i<results.rows.length;i++) {
          array.push(results.rows[i].doc);
        }
        let newArray = [];
        for(let i=0;i<array.length;i++) {
          let objDB = array[i];
          let exist = false;
          for(let y=0;y<list.length;y++) {
            let obj = list[y];
            if(objDB.id == obj.id) {
              objDB.name = obj.name;
              objDB.group = obj.group;
              exist = true;
              break;
            }
          }
          if(!exist) {
            objDB._deleted = true;
          }
          newArray.push(objDB);
        }

        for(let i=0;i<list.length;i++) {
          let obj = list[i];
          let exist = false;
          for(let y=0;y<array.length;y++) {
            let obj2 = array[y];
            if(obj.id == obj2.id) {
              exist = true;
              break;
            }
          }
          if(!exist) {
            obj._id = obj.id.toString();
            obj.favor = false;
            newArray.push(obj);
          }
        }

        localDB.bulkDocs(newArray)
        .then(() => {
          getCommonReportsFromDB()
          .then(() => {
            resolve();
          })
          .catch((err) => {
            reject();
          });
        })
        .catch((err) => {
          console.log('err '+err);
          getCommonReportsFromDB()
          .then(() => {
            resolve();
          })
          .catch((err) => {
            reject();
          });
        });
      })
      .catch((err) => {
        console.log('err allDocs='+err);
        let array = [];
        for(var i=0;i < list.length;i++) {
          let obj = list[i];
          obj._id = obj.id.toString();
          obj.favor = false;
          array.push(obj);
        }
        localDB.bulkDocs(array)
        .then(() => {
          getCommonReportsFromDB()
          .then(() => {
            resolve();
          })
          .catch((err) => {
            reject();
          });
        })
        .catch((err) => {
          network.commonReportsList = [];
          reject();
        });
      });
      // network.commonReportsList = body.list;
      // resolve();
    }).catch((error) => {
      console.log('err getReportsApteka='+error);
      reject('Неизвестная ошибка. Повторите снова.');
    });
  });
}

export function getCommonReportsFromDB() {
  return new Promise(function(resolve, reject) {
    const localDB = new PouchDB('commonReports');
    localDB.allDocs({
      include_docs: true,
    }).then((results) => {
      let array = [];
      for(var i=0;i<results.rows.length;i++) {
        array.push(results.rows[i].doc);
      }
      sortCommonReports(array)
      .then((reports) => {
        network.commonReportsList = reports;
        resolve();
      });
    }).catch((err) => {
      console.log('err getReportsAptekaFromDB='+err);
      network.commonReportsList = [];
      reject(rows);
    });
  });
}

export function sortCommonReports(reports) {
  return new Promise(function(resolve, reject) {
    reports.sort(function(a, b){
      return a.favor < b.favor;
    });
    resolve(reports);
  });
}

export function favorCommonReport(id) {
  return new Promise(function(resolve, reject) {
    const localDB = new PouchDB('commonReports');
    localDB.get(id)
    .then((results) => {
      // console.log('res='+JSON.stringify(results));
      results.favor = true;
      localDB.put(results)
      .then((response) => {
        getCommonReportsFromDB()
        .then(() => {
          resolve();
        })
        .catch((err) => {
          reject();
        });
      })
      .catch((err) => {
        console.log('err2=' + err);
        reject();
      });
    })
    .catch((err) => {
      console.log('reports3');
      console.log('err='+err);
      reject();
    });
  });
}

export function unfavorCommonReport(id) {
  return new Promise(function(resolve, reject) {
    const localDB = new PouchDB('commonReports');
    localDB.get(id)
    .then((results) => {
      // console.log('res='+JSON.stringify(results));
      results.favor = false;
      localDB.put(results)
      .then((response) => {
        getCommonReportsFromDB()
        .then(() => {
          resolve();
        })
        .catch((err) => {
          reject();
        });
      })
      .catch((err) => {
        console.log('err2=' + err);
        reject();
      });
    })
    .catch((err) => {
      console.log('reports3');
      console.log('err='+err);
      reject();
    });
  });
}
