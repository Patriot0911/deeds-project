import 'dotenv/config';
import { botIntents } from './utils/helpers/helpers';
import deedClient from './classes/deedClient';

const client = new deedClient(
    {
	    intents: botIntents
    }
)
.login(process.env.TOKEN)
.catch((err) => {
    console.error('[Initial Error accured]');
    console.error(err);
});