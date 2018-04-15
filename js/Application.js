import soma from 'soma.js';
import BetModel from './models/BetModel';
import MainMediator from './mediators/MainMediator';
import AlertCommand from './commands/AlertCommand';

export default class Application extends soma.Application {
    constructor(mainView){
        super();

        this.mainView = mainView;

        this.initModel();
        this.initMediator();
        this.initCommand();

        this.dispatcher.dispatch('alert', 'qoo');
    }

    initCommand(){
        this.commands.add('alert', AlertCommand);
    }

    initModel(){
        this.injector.mapClass('betModel', BetModel, true);
    }

    initMediator(){
        this.mediators.create(MainMediator, this.mainView);
    }
}