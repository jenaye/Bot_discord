const Discord = require('discord.js');
const bot = new Discord.Client();
const config = require ("./config.json");

bot.on('ready', () => {
  console.log('Bot online');
});

bot.on("guildMemberAdd", member => {
	let guild = member.guild;
	guild.defaultChannel.sendMessage(`Je tai capté ${member.user} sur le server, ton id ${member.user.id}`);
	message.author.sendMessage("je t'invites a faire !help pour voir ce que je peux faire pour toi !");
});


bot.on("guildCreate", guild =>{
	console.log(`New guild added : ${guild.name}, owned by ${guild.owner.user.username}`)
});


bot.on("presenceUpdate", (oldMember, newMember) =>{
	let guild = newMember.guild;
	let playRole = guild.roles.find("name", "Joue à Counter-Strike: Global Offensive");
	if(!playRole) return;
if(newMember.user.presence.game && newMember.user.presence.game.name === "Counter-Strike: Global Offensive"){
	newMember.addRole(playRole);

}else if(!newMember.user.presence.game && newMember.roles.has(playRole.id)){
	newMember.removeRole(playRole);
}


});


bot.on('message', message => {
	if(message.author.bot) return;
	if(!message.content.startsWith(config.prefix)) return;


	let command = message.content.split(" ")[0];
	command = command.slice(config.prefix.length);
	let args = message.content.split(" ").slice(1);

	if(command === "add"){
		/*let [num1, num2] = [parseInt(args[0]), parseInt(args[1])];*/
		let numArray = args.map(n => parseInt(n));
		let total = numArray.reduce( (p,c)=> p+c);
/*	let num1 = parseInt(args[0]);
	let num2 = parseInt(args[1]);*/
	/*message.channel.sendMessage(num1 + num2);*/
	message.channel.sendMessage(total);
	}

	if(command === "help"){
		 message.author.sendMessage("!kick @name, !add 2 3");
	}


	if(command === "jenaye"){
		 message.author.sendMessage("http://jenaye.fr/ phone : 06 61 27 14 23 ");
	}

	if(command === "3ngelbarte"){
		message.author.sendMessage("https://3ngelbarte.github.io/ name : Octave");
	}



	if(command ==="kick"){
		 let modRole = message.guild.roles.find("name", "dev");
		if(!message.member.roles.has(modRole.id)){
			return message.reply(" u don't have permisson to kick someone");
		}
		if(message.mentions.users.size === 0){
			return message.reply("Précise moi correctement par le nom ou l'id la personne que tu souhaites kick");
		}
		let kickMember = message.guild.member(message.mentions.users.first());
		if(!kickMember){
			return message.reply("not valid");
		}
		if(!message.guild.member(bot.user).hasPermission("KICK_MEMBERS")){
			message.reply("dont have permisson");
		}
		kickMember.kick();



	}
	if(command ==="invite"){
		let modRole = message.guild.roles.find("name", "Admin");
  		if(message.member.roles.has(modRole.id)){
  		    message.channel.sendMessage('https://discord.gg/Xxx');
  	}else{
  		    message.reply('u dont have the permisson to use this command.');
  	}
	}


});

bot.login(config.token);