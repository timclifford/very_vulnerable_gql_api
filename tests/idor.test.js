var exec = require('child_process').exec;

describe('patientsQueryIDOR', () => {
  test("As an attacker, when I enumerate through a dictionary of usernames as doctor input arguments, I can see leaked patient records", async () => {
    const graudit = exec("./graudit attack -u http://localhost:8000/graphql -p \"patient-IDOR\" -c \"vulnerable-app.config.json\" --format json");

    var chunks = "";
    graudit.stdout.on('data', (chunk) => {
      chunks += chunk;
    });

    let results;
    graudit.stdout.on('end', () => {
      const parseString = JSON.parse(chunks);


      for (var key in parseString) {
        if (Array.isArray(parseString[key])) {
          if (parseString[key].length) {
            results = parseString[key];
          }
        }
      }
    });

    graudit.on('close', (code) => {
      // expect(JSON.stringify(results)).not.toEqual(expect.stringContaining('medical_record'));
      expect(JSON.stringify(results)).toEqual(expect.stringContaining('medical_record'));
      done();
    });
  });
});
