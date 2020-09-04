const GoldenGoose = artifacts.require('GoldenGoose.sol');


const { increaseTimeTo, duration } = require('openzeppelin-solidity/test/helpers/increaseTime');
const { latestTime } = require('openzeppelin-solidity/test/helpers/latestTime');

var Web3 = require("web3");
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

var Web3Utils = require('web3-utils');

contract('reapTokGoldenGooseen Contract', async (accounts) => {

    it('Should correctly initialize constructor of GoldenGoose token Contract', async () => {

        this.tokenhold = await GoldenGoose.new("Golden Goose", "GOLD", 18, 500000000, accounts[0]);

    });

    it('Should check a name of a token', async () => {

        let name = await this.tokenhold.name.call();
        assert.equal(name, "Golden Goose");

    });

    it('Should check a symbol of a token', async () => {

        let symbol = await this.tokenhold.symbol.call();
        assert.equal(symbol, "GOLD");

    });

    it('Should check a decimal of a token', async () => {

        let decimals = await this.tokenhold.decimals.call();
        assert.equal(decimals, 18);

    });

    it('Should check a owner of a token', async () => {

        let getowner = await this.tokenhold.getowner.call();
        assert.equal(getowner, accounts[0]);

    });

    it('Should check the total supply of a token contract', async () => {

        let totalSupply = await this.tokenhold.totalSupply();
        assert.equal(totalSupply, 500000000000000000000000000);

    });

    it('Should check status of token lock', async () => {

        let _lockStatus = await this.tokenhold._lockStatus.call();
        assert.equal(_lockStatus, false);

    });

    it('Should check airDrop count', async () => {

        let _lockStatairdropcountus = await this.tokenhold.airdropcount.call();
        assert.equal(_lockStatairdropcountus, 0);

    });

    it('Should check balance of a owner ', async () => {

        let balanceOf = await this.tokenhold.balanceOf(accounts[0]);
        assert.equal(balanceOf, 500000000000000000000000000);

    });

    it('Should be able to transfer tokens by owner only using transfer function ', async () => {

        await this.tokenhold.transfer(accounts[1], web3.utils.toHex(100 * 10 ** 18));


    });

    it('Should check balance of a receiver ', async () => {

        let balanceOf = await this.tokenhold.balanceOf(accounts[1]);
        assert.equal(balanceOf, 100000000000000000000);

    });

    it('Should not be able to transfer locking tokens by non owner ', async () => {


        try {
            await this.tokenhold.transferByOwner(accounts[2], web3.utils.toHex(100 * 10 ** 18), 10, { from: accounts[2] });
        } catch (error) {
            var error_ = 'Returned error: VM Exception while processing transaction: revert You are not authenticate to make this transfer -- Reason given: You are not authenticate to make this transfer.';
            assert.equal(error.message, error_, 'Reverted ');
        }

    });

    it('Should be able to transfer locking tokens by  owner account only', async () => {

        await this.tokenhold.transferByOwner(accounts[2], web3.utils.toHex(100 * 10 ** 18), 10);


    });

    it('Should check balance of a receiver accounts[2]', async () => {

        let balanceOf = await this.tokenhold.balanceOf(accounts[2]);
        assert.equal(balanceOf, 100000000000000000000);

    });

    it('Should check locking status of a accounts[2]', async () => {

        let getLockingStatus = await this.tokenhold.getLockingStatus(accounts[2]);
        assert.equal(getLockingStatus, true);

    });

    it('Should check locking status of a accounts[1]', async () => {

        let getLockingStatus = await this.tokenhold.getLockingStatus(accounts[1]);
        assert.equal(getLockingStatus, false);

    });

    it('Should check locking time of a accounts[2]', async () => {

        let checkLockingTimeByAddress = await this.tokenhold.checkLockingTimeByAddress(accounts[1]);


    });

    it('Should not be able to transfer locked tokens by accounts[2]', async () => {

        try {
            await this.tokenhold.transfer(accounts[1], web3.utils.toHex(100 * 10 ** 18));
        } catch (error) {
            var error_ = 'Returned error: VM Exception while processing transaction: Transfer can not be processed -- Reason given: Transfer can not be processed';
            assert.equal(error.message, error_, 'Reverted ');
        }

    });

    it('Should be able to transfer tokens by non owner account those are not locked', async () => {

        await this.tokenhold.transfer(accounts[3], web3.utils.toHex(50 * 10 ** 18), { from: accounts[1] });

    });

    it('Should check balance of a receiver ', async () => {

        let balanceOf = await this.tokenhold.balanceOf(accounts[3]);
        assert.equal(balanceOf.toString(), "50000000000000000000");

    });

    it('Should check balance of a sender ', async () => {

        let balanceOf = await this.tokenhold.balanceOf(accounts[1]);
        assert.equal(balanceOf.toString(), "150000000000000000000");

    });

    it('Should be able to transfer tokens by non owner account those are not locked to account which is already holding locked tokens', async () => {

        await this.tokenhold.transfer(accounts[2], web3.utils.toHex(10 * 10 ** 18), { from: accounts[1] });

    });

    it('Should check balance of a receiver ', async () => {

        let balanceOf = await this.tokenhold.balanceOf(accounts[2]);
        assert.equal(balanceOf.toString(), "110000000000000000000");

    });

    it('Should check balance of a sender ', async () => {

        let balanceOf = await this.tokenhold.balanceOf(accounts[1]);
        assert.equal(balanceOf.toString(), "140000000000000000000");

    });

    it('Should be able to transfer tokens by account[2] which tokens are not locked i.e 10 tokens', async () => {

        await this.tokenhold.transfer(accounts[4], web3.utils.toHex(10 * 10 ** 18), { from: accounts[2] });

    });

    it('Should check balance of a sender ', async () => {

        let balanceOf = await this.tokenhold.balanceOf(accounts[2]);
        assert.equal(balanceOf.toString(), "100000000000000000000");

    });

    it('Should not be able to transfer tokens by account[2] which tokens not locked i.e 100 tokens after spending unlock tokens', async () => {

        try {
            await this.tokenhold.transfer(accounts[4], web3.utils.toHex(10 * 10 ** 18), { from: accounts[2] });
        } catch (error) {
            var error_ = 'Returned error: VM Exception while processing transaction: revert Insufficient unlocked balance -- Reason given: Insufficient unlocked balance.';
            assert.equal(error.message, error_, 'Reverted ');
        }


    });

    it("should check approval by accounts 4 to accounts 2", async () => {

        let allowance = await this.tokenhold.allowance.call(accounts[4], accounts[2]);
        assert.equal(allowance, 0, "allowance is wrong when approve");

    });

    it("should Approve accounts[4] to spend specific tokens of accounts[2]", async () => {

        this.tokenhold.approve(accounts[4], web3.utils.toHex(50 * 10 ** 18), { from: accounts[2] });

    });

    it("should increase Approve accounts[4] to spend specific tokens of accounts[2]", async () => {

        this.tokenhold.increaseAllowance(accounts[4], web3.utils.toHex(50 * 10 ** 18), { from: accounts[2] });

    });

    it("should decrease Approve accounts[4] to spend specific tokens of accounts[2]", async () => {

        this.tokenhold.decreaseAllowance(accounts[4], web3.utils.toHex(50 * 10 ** 18), { from: accounts[2] });

    });

    it("should Approve accounts[4] to spend specific tokens of accounts[2]", async () => {

        let allowanceLater = await this.tokenhold.allowance.call(accounts[2], accounts[4]);
        assert.equal(allowanceLater, 50 * 10 ** 18, "allowance is wrong when approve");

    });

    it('Should not be able to transferFrom tokens which are locked', async () => {

        try {
            await this.tokenhold.transferFrom(accounts[2], accounts[4], web3.utils.toHex(10 * 10 ** 18), { from: accounts[4] });
        } catch (error) {
            var error_ = 'Returned error: VM Exception while processing transaction: revert Insufficient unlocked balance -- Reason given: Insufficient unlocked balance.';
            assert.equal(error.message, error_, 'Reverted ');
        }
    });


    it("should not be able to stop transfer function by non owner account", async () => {


        try {
            await this.tokenhold.setAllTransfersLockStatus(true, { from: accounts[1] });
        } catch (error) {
            var error_ = 'Returned error: VM Exception while processing transaction: revert You are not authenticate to make this transfer -- Reason given: You are not authenticate to make this transfer.';
            assert.equal(error.message, error_, 'Reverted ');
        }
    });

    it('Should check status of token lock before locking', async () => {

        let _lockStatus = await this.tokenhold._lockStatus.call();
        assert.equal(_lockStatus, false);

    });

    it("should be able to stop all transfer function by owner account", async () => {

        await this.tokenhold.setAllTransfersLockStatus(true, { from: accounts[0] });

    });

    it('Should check status of token lock after locking', async () => {

        let _lockStatus = await this.tokenhold._lockStatus.call();
        assert.equal(_lockStatus, true);

    });

    it("should not be able to stop transfer function by non owner account", async () => {


        try {
            await this.tokenhold.transferFrom(accounts[2], accounts[5], web3.utils.toHex(100 * 10 ** 18), { from: accounts[4] });
        } catch (error) {
            var error_ = 'Returned error: VM Exception while processing transaction: revert All transactions are locked for this contract -- Reason given: All transactions are locked for this contract.';
            assert.equal(error.message, error_, 'Reverted ');
        }
    });
    

    it('Should check status of token lock after locking', async () => {

        let _lockStatus = await this.tokenhold.getAllTransfersLockStatus();
        assert.equal(_lockStatus, true);

    });

    it("should be able to unstop all transfer function by owner account", async () => {

        await this.tokenhold.setAllTransfersLockStatus(false, { from: accounts[0] });

    });

    it('Should check status of token lock after locking stop', async () => {

        let _lockStatus = await this.tokenhold._lockStatus.call();
        assert.equal(_lockStatus, false);

    });

    it("should check approval by accounts 1 to accounts 5", async () => {

        let allowance = await this.tokenhold.allowance.call(accounts[1], accounts[5]);
        assert.equal(allowance, 0, "allowance is wrong when approve");

    });

    it("should Approve accounts[5] to spend specific tokens of accounts[1]", async () => {

        this.tokenhold.approve(accounts[5], web3.utils.toHex(50 * 10 ** 18), { from: accounts[1] });

    });

    it("should Approve accounts[4] to spend specific tokens of accounts[1]", async () => {

        let allowanceLater = await this.tokenhold.allowance.call(accounts[1], accounts[5]);
        assert.equal(allowanceLater, 50 * 10 ** 18, "allowance is wrong when approve");

    });

    it('Should check balance of a sender before calling transferfrom', async () => {

        let balanceOf = await this.tokenhold.balanceOf(accounts[2]);
        assert.equal(balanceOf.toString(), "100000000000000000000");

    });

    it("should not be able to stop transfer function by non owner account", async () => {


        try {
            await this.tokenhold.transferFrom(accounts[2], accounts[5], web3.utils.toHex(100 * 10 ** 18), { from: accounts[4] });
        } catch (error) {
            var error_ = 'Returned error: VM Exception while processing transaction: revert Insufficient unlocked balance -- Reason given: Insufficient unlocked balance.';
            assert.equal(error.message, error_, 'Reverted ');
        }
    });

    // it('Should be able to transferFrom', async () => {

    //     await this.tokenhold.transferFrom(accounts[2], accounts[5], web3.utils.toHex(50 * 10 ** 18), { from: accounts[5] });

    // });

    // it('Should check balance of a sender after calling transferfrom', async () => {

    //     let balanceOf = await this.tokenhold.balanceOf(accounts[2]);
    //     assert.equal(balanceOf.toString(), "5000000000000000000");

    // });

    it('Should not be able to burn tokens by non owner account', async () => {

        try {
            await this.tokenhold.burn(web3.utils.toHex(50 * 10 ** 18), { from: accounts[2] });
        } catch (error) {
            var error_ = 'Returned error: VM Exception while processing transaction: revert You are not authenticate to make this transfer -- Reason given: You are not authenticate to make this transfer.';
            assert.equal(error.message, error_, 'Reverted ');
        }
    });

    it('Should not be able to burn tokens by non owner account', async () => {


            await this.tokenhold.burn(web3.utils.toHex(50 * 10 ** 18), { from: accounts[0] });

    });

    it('Should check balance of a sender before calling transferfrom', async () => {

        let balanceOf = await this.tokenhold.balanceOf(accounts[0]);
        assert.equal(balanceOf.toString(), "499999650000000000000000000");

    });

    it('Should not be able to burn tokens by non owner account', async () => {

        try {
            await this.tokenhold.airdropByOwner([accounts[0]],[web3.utils.toHex(50 * 10 ** 18)], { from: accounts[2] });
        } catch (error) {
            var error_ = 'Returned error: VM Exception while processing transaction: revert You are not authenticate to make this transfer -- Reason given: You are not authenticate to make this transfer.';
            assert.equal(error.message, error_, 'Reverted ');
        }

    });

    it('Should check a owner of a token', async () => {

    let getowner = await this.tokenhold.getowner.call();
    assert.equal(getowner, accounts[0]);

    });

    it('Should trasnfer ownership', async () => {

        await this.tokenhold.transferOwnership(accounts[9]);
        
    
    });

    it('Should check a owner of a token after ownership transfer', async () => {

        let getowner = await this.tokenhold.getowner.call();
        assert.equal(getowner, accounts[9]);
    
        
    });

    it('Should trasnfer ownership again', async () => {

        await this.tokenhold.transferOwnership(accounts[0],{from : accounts[9]});    
    
    });

    it('Should check airDrop count before doing airdrop', async () => {

        let _lockStatairdropcountus = await this.tokenhold.airdropcount.call();
        assert.equal(_lockStatairdropcountus, 0);

    });

    it('Should airdrop tokens', async () => {

        await this.tokenhold.airdropByOwner([accounts[9],accounts[8]],[100,100],{from : accounts[0]});    
    
    });


    it('Should not be able to airdrop tokens by non owner account', async () => {


        try {
        await this.tokenhold.airdropByOwner([accounts[9],accounts[8]],[100,100],{from : accounts[1]});    
        } catch (error) {
            var error_ = 'Returned error: VM Exception while processing transaction: revert You are not authenticate to make this transfer -- Reason given: You are not authenticate to make this transfer.';
            assert.equal(error.message, error_, 'Reverted ');
        }    
    });

    it('Should not be able to airdrop tokens when accounts and values are not equal', async () => {

        try {
        await this.tokenhold.airdropByOwner([accounts[9],accounts[8]],[100,100,100],{from : accounts[1]});    
        } catch (error) {
            var error_ = 'Returned error: VM Exception while processing transaction: revert You are not authenticate to make this transfer -- Reason given: You are not authenticate to make this transfer.';
            assert.equal(error.message, error_, 'Reverted ');
        }    
    });

    it('Should be able to transfer locking tokens by  owner account only', async () => {

        await this.tokenhold.transferByOwner(accounts[6], web3.utils.toHex(100 * 10 ** 18), 2);


    });

    it('Should be able to increase locking time', async () => {

        await this.tokenhold.increaseLockingTimeByAddress(accounts[6], 2);


    });

    it('Should check locking time of a accounts[6', async () => {

        let checkLockingTimeByAddress = await this.tokenhold.checkLockingTimeByAddress(accounts[6]);


    });

    it('Should be able to decrease locking time', async () => {

        await this.tokenhold.decreaseLockingTimeByAddress(accounts[6], 500);


    });

    it('Should check locking time of a accounts[6', async () => {

        let checkLockingTimeByAddress = await this.tokenhold.checkLockingTimeByAddress(accounts[6]);
        console.log(checkLockingTimeByAddress.toNumber());

    });


    it('Should be able to transfer locking tokens by  owner only', async () => {

        await this.tokenhold.transferLockedTokens(accounts[6], accounts[7],web3.utils.toHex(1 * 10 ** 18));


    });
})


