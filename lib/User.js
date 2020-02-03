const Authentication = require('./Authentication');

class User extends Authentication {
    constructor(props){
        super(props);
    }

    async listUsers(orgId){
        try{
            let res = await super.authorizedRequest({
                method: "GET",
                path: `/user/${orgId}`
            });
            return res.data;
        } catch(err){
            console.log(err);
        }
    }

    async findUser(orgId, username){
        var foundUser;
        try{
            let res = await super.authorizedRequest({
                method: "GET",
                path: `/user/${orgId}`
            });

            for (let user of res.data){
                if(user.name.toUpperCase() == username.toUpperCase()){
                    foundUser = user;
                    break;
                }
            }
        } catch(err){
            console.log(err);
        }
        if(foundUser){ return foundUser }
        else{ console.log(`Couldn't find ${username}`) }
    }

    async createUser(orgId, params = {}){
        let defaultParams = {
            name: "default-user",
            email: "",
            disabled: false,
            yubico_id: "",
            groups: [],
            pin: "",
            network_links: [],
            bypass_secondary: false,
            client_to_client: false,
            dns_servers: [],
            dns_suffix: "",
            port_forwarding: []
        };
        params = Object.assign({}, defaultParams, params);
        
        try{
            let res = await super.authorizedRequest({
                method: "POST",
                path: `/user/${orgId}`,
                data: params
            });
            
            if(res.data[0]){ 
                let createdUser = res.data[0];                
                console.log(`User: ${createdUser.name.replace(" ","")} was created in the ${createdUser.organization_name} organization!`); 
            }
        } catch(err){
            console.log(err);
        }
    }

    async createUsers(orgId, userParamsArr){        
        try{
            let res = await super.authorizedRequest({
                method: "POST",
                path: `/user/${orgId}/multi`,
                data: userParamsArr
            });
            
            if(res.data){ 
                let createdUsers = res.data;            
                console.log(`${createdUsers.length} users have been created!`);
            }
        } catch(err){
            console.log(err);
        };
    }

    async generateUserDefaultParams(usernameArr, params){
        let defaultParams = {
            name: "default-user",
            email: "",
            disabled: false,
            yubico_id: "",
            groups: [],
            pin: "",
            network_links: [],
            bypass_secondary: false,
            client_to_client: false,
            dns_servers: [],
            dns_suffix: "",
            port_forwarding: []
        };
        params = Object.assign({}, defaultParams, params);
        
        let userDefaultParamsArr = usernameArr.map((username) => {
            return {
                ...params,
                name: username
            }
        });

        return userDefaultParamsArr;
    }
}

module.exports = User;