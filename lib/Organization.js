const Authentication = require('./Authentication');

class Organization extends Authentication {
    constructor(props){
        super(props);
    }

    async listOrganizations(){
        try{
            let res = await super.authorizedRequest({
                method: "GET",
                path: "/organization"
            });
            return res.data;
        } catch(err){
            console.log(err);
        }
    }

    async findOrganizationByName(orgName="DEFAULT ORG"){
        var foundOrg;
        try{
            let res = await super.authorizedRequest({
                method: "GET",
                path: "/organization"
            });
            for (let org of res.data){
                if(org.name.toUpperCase() == orgName.toUpperCase()){
                    foundOrg = org;
                    break;
                }
            }
        } catch(err){
            console.log(err);
        }
        if(foundOrg){ return foundOrg }
        else{ console.log(`Couldn't find ${orgName}`) }
    }

    async createOrganization(params = {}) {
        let defaultParams = {
            name: "default-org"
        };
        params = Object.assign({}, defaultParams, params);

        try{
            let res = await super.authorizedRequest({
                method: "POST",
                path: "/organization",
                data: params
            });

            if(res.data){
                let createdOrganization = res.data;
                console.log(`Org: ${createdOrganization.name.replace(" ","")} was created with ID: ${createdOrganization.id}`);
            }
        } catch(err){
            console.log(err)
        }
    }
}

module.exports = Organization;