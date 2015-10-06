(function (module) {

  module.service('AppState', function () {

    var state = {
      draftSession: false,
      sessions: []
    };


    // Implementations

    function Session(options) {
      _.assign(this, {
        draft: true
      }, options);

      return this;
    }

    function newSession(options) {
      var session = new Session(options);

      state.sessions.push(session);

      state.draftSession = session;

      return session;
    }

    function cancelSession(session) {
      var sessionIndex = _.findIndex(state.sessions, session);

      if (sessionIndex >= 0) {
        state.sessions.splice(sessionIndex, 1);
      }

      if (state.draftSession === session) {
        getDraftSession();
      }
    }

    function getDraftSession() {
      return state.draftSession = _.find(state.sessions, 'draft');
    }


    // Export

    return {
      state: state,

      Session: Session,
      newSession: newSession,
      cancelSession: cancelSession,
      getDraftSession: getDraftSession
    };
  });

})(angular.module('application'));
