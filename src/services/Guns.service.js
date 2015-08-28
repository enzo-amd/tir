(function (module) {

  module.service('Guns', function ($q) {

    var state = {
      guns: null
    };

    var guns = [
      {
        name: 'g1',
        title: 'G1',
        image: 'gun-1.jpg'
      },
      {
        name: 'g2',
        title: 'G2',
        image: 'gun-2.jpg'
      },
      {
        name: 'g3',
        title: 'G3',
        image: 'gun-3.jpg'
      },
      {
        name: 'g4',
        title: 'G4',
        image: 'gun-4.jpg'
      },
      {
        name: 'g5',
        title: 'G5',
        image: 'gun-5.jpg'
      },
      {
        name: 'g6',
        title: 'G6',
        image: 'gun-6.jpg'
      },
      {
        name: 'g7',
        title: 'G7',
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
