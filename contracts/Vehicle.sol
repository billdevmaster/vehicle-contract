pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract VehicleRegistry is AccessControl {
	bytes32 public constant SERVICE_WORKER_ROLE = keccak256("SERVICE_WORKER_ROLE");

	address private _admin;
	address[] public serviceWorkers;

  	struct Vehicle {
	    address owner;
	    string VIN;
	    string name;
	    string make;
	    string model;
	    string color;
  	}

  	Vehicle[] public vehicles;

  	mapping (uint => string) public vehicleToVIN;
  	mapping (string => uint) public VINToVehicle;

  	event SetServiceWorkder(address account);
  	event AddVehicle(uint id, address owner, string VIN, string name, string make, string model, string color);

  	modifier onlyAdmin() {
    	require(hasRole(DEFAULT_ADMIN_ROLE, _msgSender()), "Vehicle: caller is not admin");
    	_;
  	}

  	modifier onlyServiceWorker() {
    	require(hasRole(SERVICE_WORKER_ROLE, _msgSender()), "Vehicle: caller is not service workder");
        _;
  	}

  	constructor(address admin) {
        _setupRole(DEFAULT_ADMIN_ROLE, admin);
        
        // the vehicle at position 0 of vehicles[]
	  	// is fake
	  	// it's a mythical vehicle
	  	// that doesn't really exist
	  	vehicles.push(Vehicle(address(0x0), " ", " ", " ", " ", " "));
    }

    function setAdmin(address admin) external onlyAdmin{
        grantRole(DEFAULT_ADMIN_ROLE, admin);
        _admin = admin;
    }

  	function setServiceWorker(address account) external onlyAdmin {
	    require(!hasRole(SERVICE_WORKER_ROLE, account), "Vehicle: ALREADY_SERVICE_WORKDER_ROLE");
        grantRole(SERVICE_WORKER_ROLE, account);
        serviceWorkers.push(account);

        emit SetServiceWorkder(account);
  	}

  	function addVehicle (
  		string memory VIN,
  		string memory name,
  		string memory make,
  		string memory model,
  		string memory color
	) external onlyServiceWorker {
		require(VINToVehicle[VIN] == 0, "Vehicle: VIN is already registered");

		vehicles.push(Vehicle(_msgSender(), VIN, name, make, model, color));
		uint id = vehicles.length - 1;

		vehicleToVIN[id] = VIN;
		VINToVehicle[VIN] = id;

		emit AddVehicle(id, _msgSender(), VIN, name, make, model, color);
	}

	function getVehicle(string memory VIN) public view returns (address, string memory, string memory, string memory, string memory) {
	    uint id = VINToVehicle[VIN];
	    return (vehicles[id].owner, vehicles[id].name, vehicles[id].make, vehicles[id].model, vehicles[id].color);
  	}
}
	