const crypto = require("crypto");
const secret_config = require("../config/server-config.json");

module.exports = function(req, res, next) {
  //Get token from header
  const token = req.header("x-auth-token");

  //Check if no token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  //Verify token
  try {
    // create a aes267 decipher based on our key
    const decipher = crypto.createDecipheriv("aes-256-cbc", secret_config.secretKey, secret_config.iv);
    // update the decipher with our encrypted string
    let decrypted_token = decipher.update(token, "base64", "utf8");

    decrypted_token += decipher.final("utf8");

    decrypted_object = JSON.parse(decrypted_token);

    const server_hash = crypto
      .createHash("md5")
      .update(secret_config.ServerSecret)
      .digest("hex");
    const authenitcation_attempt_hash = decrypted_object.serverHash;

    if (server_hash !== authenitcation_attempt_hash) throw "Invalid Token hash";

    const token_expire_date = decrypted_object.created_at + decrypted_object.expire_time;

    if (token_expire_date < Math.round(new Date() / 1000)) throw "Invalid Token time";

    req.user = decrypted_object.id;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ msg: "Token is not valid" });
  }
};
