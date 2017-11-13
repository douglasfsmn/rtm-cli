'use strict';

/**
 * Display the Interactive Mode Prompt
 */
function prompt() {
  global._interactive = true;

  // Display the Prompt
  global._rl.question("> ", function(line) {

    let params = line.trim().split(' ');
    let cmd = params[0];
    params.unshift(process.argv[0], process.argv[1]);

    // Exit
    if ( cmd.toLowerCase() === 'quit' || cmd.toLowerCase() === 'exit' ) {
      global._rl.close();
      process.exit(0);
    }

    // Help
    if ( cmd.toLowerCase() === 'help' ) {
      global._program.outputHelp();
      prompt();
    }

    // Parse the line command with commander
    global._program.parse(params);

  });

}


module.exports = prompt;