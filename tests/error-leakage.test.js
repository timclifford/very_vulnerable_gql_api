const util = require('util');
const exec = require('child_process').exec;

describe('errorLeaks', () => {
  test("As an attacker, when I enumerate through full names via the patient query, I can see leaked error response confirming a patient exists", async () => {
    const graudit = exec("./graudit attack -u http://localhost:8000/graphql -p \"patient-error-leak\" -c \"vulnerable-app.config.json\" --format json");

    var chunks = "";
    graudit.stdout.on('data', (chunk) => {
      chunks += chunk;
    });


    graudit.on('error', (error) => {
      console.log(error);
    });

    graudit.on('exit', (code, signal) => {

      const { exception } = JSON.parse(chunks) || null;
      const results = exception.exception_found;

      const hasErrorLeakedPatientExists = results.some(err => err.exception.stacktrace[0].substring(0, 37) === "Error: No patient could be found with");
      expect(hasErrorLeakedPatientExists).not.toEqual(true);
    });
  });
});
