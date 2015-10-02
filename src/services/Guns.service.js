(function (module) {

  module.service('Guns', function ($q) {

    var state = {
      guns: null
    };

    var guns = [
      {
        name: 'g1',
        title: 'G36',
        image: 'gun-1.jpg'
      },
      {
        name: 'g2',
        title: 'AK-47',
        image: 'gun-2.jpg'
      },
      {
        name: 'g3',
        title: 'Sniper Rifle',
        image: 'gun-3.jpg'
      },
      {
        name: 'g4',
        title: 'Zombie AR-15',
        image: 'gun-4.jpg'
      },
      {
        name: 'g5',
        title: 'Ruger SR9',
        image: 'gun-5.jpg'
      },
      {
        name: 'g6',
        title: 'AR-15',
        image: 'gun-6.jpg'
      },
      {
        name: 'g7',
        title: 'MP5',
        image: 'gun-7.jpg'
      }
    ];


    // Implementations

    function getGuns() {
      return $q(function (resolve, reject) {
        resolve(guns);
      });
    }


    // Export

    return {
      state: state,

      getGuns: getGuns
    };
  });

})(angular.module('application'));
