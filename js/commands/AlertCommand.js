export default class AlertCommand{
    constructor(dispatcher){
        this.dispatcher = dispatcher;
    }
    
    execute(event){
        console.log('AlertCommand', event.params);
    }
}