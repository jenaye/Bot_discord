const Discord = require('discord.js')
const bot = new Discord.Client()
const config = require ("./config.json")

bot.on('ready', () => console.log('Bot online'))

bot.on("guildMemberAdd", member => {
	const guild = member.guild
	guild.defaultChannel.sendMessage(`Je tai capté ${member.user} sur le server, ton id ${member.user.id}`)
	message.author.sendMessage("je t'invites a faire !help pour voir ce que je peux faire pour toi !")
})

bot.on("guildCreate", guild => console.log(`New guild added : ${guild.name}, owned by ${guild.owner.user.username}`))

bot.on("presenceUpdate", (oldMember, newMember) => {
	const guild = newMember.guild
	const playRole = guild.roles.find("name", "Joue à Counter-Strike: Global Offensive")
	
	if(!playRole) return

	if(newMember.user.presence.game && newMember.user.presence.game.name === "Counter-Strike: Global Offensive"){
		newMember.addRole(playRole)
	}else if(!newMember.user.presence.game && newMember.roles.has(playRole.id)){
		newMember.removeRole(playRole)
	}
})

bot.on('message', message => {
	if(message.author.bot) return
	if(!message.content.startsWith(config.prefix)) return

	const command = message.content.split(" ")[0]
		  command = command.slice(config.prefix.length)
	const args = message.content.split(" ").slice(1)

	if(command === "add"){
		const numArray = args.map(n => parseInt(n))
		const total = numArray.reduce((p,c) => p+c)

		message.channel.sendMessage(total)
	}

	if(command === "help") return message.author.sendMessage("!kick @name, !add 2 3")
	if(command === "jenaye") return message.author.sendMessage("http://jenaye.fr/ phone : 06 61 27 14 23 ")
	if(command === "3ngelbarte") return message.author.sendMessage("https://3ngelbarte.github.io/ name : Octave")
	if(command === "kick"){
		const modRole = message.guild.roles.find("name", "dev")
		const kickMember = message.guild.member(message.mentions.users.first())

		if(!message.member.roles.has(modRole.id)) return message.reply("u don't have permisson to kick someone")
		if(message.mentions.users.size === 0) return message.reply("Précise moi correctement par le nom ou l'id la personne que tu souhaites kick")
		if(!kickMember) return message.reply("not valid")
		if(!message.guild.member(bot.user).hasPermission("KICK_MEMBERS")) return message.reply("dont have permisson")

		kickMember.kick()
	}

	if(command === "invite"){
		const modRole = message.guild.roles.find("name", "Admin")
  		
  		if(message.member.roles.has(modRole.id)) ? 
  			message.channel.sendMessage('https://discord.gg/Xxx')
  		: message.reply('u dont have the permisson to use this command.')
	}
})

bot.login(config.token)
