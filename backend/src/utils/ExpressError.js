//status code or msg chane karne ke lies
class Expresserror extends Error {
  constructor(statuscode, message) {
    super();
    (this.statuscode = statuscode), (this.message = message);
  }
}

module.exports = Expresserror;
