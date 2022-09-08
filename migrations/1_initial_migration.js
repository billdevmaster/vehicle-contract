const Migrations = artifacts.require("VehicleRegistry");

module.exports = function (deployer) {
  deployer.deploy(
    Migrations, 
    "0x86C7437580C0b5b4e1FdE3896a7032f0e1cf8060",
  );
};