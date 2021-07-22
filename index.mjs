#!/usr/bin/env zx

console.log(chalk.yellow('Setting up Mac...'))
console.log(chalk.yellow('Getting user info for git'))

let fullName = await question('Enter Name: ')
let email = await question('Enter Email: ')

let createKey = await question('Do you want to create a new ssh key? Y/n ')

if (createKey && createKey !== 'n') {
    console.log(chalk.green('Creating SSH Key'))

    $`ssh-keygen -t rsa -b 4096  -C ${email}`

    console.log(chalk.green('Public Key Created'))
    console.log(chalk.green('Adding public key to ssh-agent'))

    $`eval "$(ssh-agent -s)"`

    const f = `Host *\nAddKeysToAgent yes\nUseKeychain yes\nIdentityFile ~/.ssh/id_rsa`
    $`echo ${f} >> ~/.ssh/config`
    $`ssh-add -K ~/.ssh/id_rsa`
    $`cat ~/.ssh/id_rsa.pub | pbcopy`

    console.log(chalk.green("SSH public key has been copied to clipboard"))
    console.log(chalk.green("Paste this public key into Github settings"))

    $`open https://github.com/settings/keys`

    await question(chalk.green('Hit [Enter] to continue once public key is added...'))
}

console.log(chalk.magenta('Installing Xcode Dev Tools'))
await $`xcode-select --install`
await question(chalk.green('Hit [Enter] to contine once Xcode Tools completes...'))
await $`sudo xcodebuild -license`


