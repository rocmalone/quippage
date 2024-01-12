exports.warn = function (...args) {
  const message = args.join(" ");
  console.warn("[WARNING]", message);
};

exports.log = function (...args) {
  const message = args.join(" ");
  console.log("[LOG]", message);
};

exports.error = function (...args) {
  const message = args.join(" ");
  console.error("[ERROR]", message);
};

exports.readEnvVar = function (name, fallback) {
  const envValue = process.env[name];

  if (envValue !== undefined) {
    return envValue;
  } else if (fallback !== undefined) {
    warn(
      "Cannot find environment variable '" +
        name +
        "', defaulting to " +
        fallback
    );
    return fallback;
  } else {
    throw new Error("Cannot find environment variable '" + name + "'");
  }
};
