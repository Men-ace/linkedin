import { mailtrapClient, sender } from "../lib/mailtrap.js";
import {createWelcomeEmailTemplate} from "./emailTemplates.js";

export const sendWelcomeEmail = async (email, name, profileUrl) => {
	const recipient = [{ email }];

	// eslint-disable-next-line no-useless-catch
	try {
		const response = await mailtrapClient.send({
			from: sender,
			to: recipient,
			subject: "Welcome to linkedin",
			html: createWelcomeEmailTemplate(name, profileUrl),
			category: "welcome",
		});

		console.log("Welcome Email sent succesffully", response);
	} catch (error) {
		throw error;
	}
};