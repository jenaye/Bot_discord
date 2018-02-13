const Discord = require('discord.js')
const bot = new Discord.Client()

const token = process.env.bot_token

bot.on('ready', () => console.log('Bot online'))

bot.on("guildMemberAdd", member => {
	const guild = member.guild
	guild.defaultChannel.sendMessage(`welcome ${member.user} to the server, current id ${member.user.id}`)
	message.author.sendMessage("Write !help to have all commands avalaible")
})

bot.on("guildCreate", guild => console.log(`New guild added : ${guild.name}, owned by ${guild.owner.user.username}`))

bot.on("presenceUpdate", (oldMember, newMember) => {
	const guild = newMember.guild
	const playRole = guild.roles.find("name", "Playing Counter-Strike: Global Offensive")
	
	if(!playRole) return

	if(newMember.user.presence.game && newMember.user.presence.game.name === "Counter-Strike: Global Offensive"){
		newMember.addRole(playRole)
	} else if (!newMember.user.presence.game && newMember.roles.has(playRole.id)) {
		newMember.removeRole(playRole)
	}
})

bot.on('message', message => {
	if(message.author.bot) return

	const command = message.content;

	if(command === "help") return message.author.sendMessage("!kick @name, !add 2 3")
	if(command === "jenaye") return message.author.sendMessage("http://jenaye.fr/ phone : 06 61 27 14 23")
	if(command === "kick"){
		const modRole = message.guild.roles.find("name", "dev")
		const kickMember = message.guild.member(message.mentions.users.first())

		if(!message.member.roles.has(modRole.id)) return message.reply("u don't have permisson to kick someone")
		if(message.mentions.users.size === 0) return message.reply("Gimme the name of id to kick someone")
		if(!kickMember) return message.reply("not valid")
		if(!message.guild.member(bot.user).hasPermission("KICK_MEMBERS")) return message.reply("dont have permisson")

		kickMember.kick()
	}
})

bot.login(token)
