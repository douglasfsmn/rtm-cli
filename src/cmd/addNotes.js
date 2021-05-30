'use strict';

const log = require('../utils/log.js');
const config = require('../utils/config.js');
const prompt = require('../utils/prompt.js');
const finish = require('../utils/finish.js');


/**
 * This command adds a note to a Task
 * @param args index note
 * @param env
 */
function action(args, env) {

  // Prompt for new note
  if ( args.length < 2 ) {
    prompt('Task:', 'Note:', _promptFinished);
  }

  // Add provided notes 
  else {
    _process(args[0], args[1].join(" "));
  }

}


/**
 * Process the returned answers
 * @private
 */
function _promptFinished(answers) {
  for ( let i = 0; i < answers.length; i++ ) {
    let answer = answers[i];
    _process(answer[0], answer[1], i+1, answers.length);
  }
}


/**
 * Process the request
 * @private
 */
function _process(task, notes, count=1, max=1) {
  log.spinner.start("Adding Note(s)...");
  config.user(function(user) {

    // Parse arguments
    task = parseInt(task.trim())
	if (!Array.isArray(notes) ) {
		notes = [notes];
	}

    // Add Notes
    user.tasks.addNotes(task, "", notes, function(err) {
      if ( err ) {
        log.spinner.error("Could not add note to Task #" + task + " (" + err.msg + ")");
      }
      _processFinished(count, max);
    });

  });
}

/**
 * Request Callback
 * @private
 */
function _processFinished(count, max) {
  log.spinner.start("Adding Notes [" + count + "/" + max + "]...");
  if ( count === max ) {
    log.spinner.success("Note(s) Added");
    return finish();
  }
}


module.exports = {
  command: 'addNotes [index] [notes...]',
  alias: 'an',
  description: 'Add one or more notes to a Task',
  action: action
};
