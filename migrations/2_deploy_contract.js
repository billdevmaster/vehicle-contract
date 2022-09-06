const VechicleRegistry = artifacts.require('./Vechicle.sol')

module.exports = async function(deployer) {
  await deployer.deploy(VechicleRegistry)
}
