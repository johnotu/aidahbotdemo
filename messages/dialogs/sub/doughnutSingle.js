const builder = require('botbuilder');
const doughnuts = require("../../model/doughnuts.json");

module.exports = [
    session => {
        session.sendTyping();
        session.send("Single Doughnuts");
        const doughnutCategories = Object.keys(doughnuts.doughnuts);
        session.send("What type of doughnut do you want?");
        let doughnutCards = [], doughnutSelection = [];
        for(let i=0; i<doughnutCategories.length; i++){
           doughnutCards.push(
                new builder.HeroCard(session)
                    .title(doughnutCategories[i])
                    .subtitle(doughnuts.doughnuts[doughnutCategories[i]].description)
                    
                    .text("http://www.doughmanfoods.com/")
                    
                    .images([
                        builder.CardImage.create(session, doughnuts.doughnuts[doughnutCategories[i]].image)
                            .tap(builder.CardAction.showImage(session, doughnuts.doughnuts[doughnutCategories[i]].image)),
                    ])
                    .buttons([
                        builder.CardAction.imBack(session, doughnutCategories[i], "Select")
                    ])
            );
        }

        let doughnutCarousel = new builder.Message(session)
            .attachmentLayout(builder.AttachmentLayout.carousel)
            .attachments(doughnutCards);
        
        builder.Prompts.choice(session, doughnutCarousel, doughnutCategories);
    },
    (session, results) => {
        session.sendTyping();
        let doughCategory = results.response.entity;
        session.dialogData.doughCategory = results.response.entity;
        session.send("Which of the %s Doughnuts would you prefer?", doughCategory);
        let doughCards = [], doughSelection = [];
        for(let i=0; i<doughnuts.doughnuts[doughCategory].detail.length; i++){
           doughCards.push(
                new builder.HeroCard(session)
                    .title(doughnuts.doughnuts[doughCategory].detail[i].name)
                    .subtitle(doughnuts.doughnuts[doughCategory].detail[i].description)
                    
                    .text("http://www.doughmanfoods.com/")
                    
                    .images([
                        builder.CardImage.create(session, doughnuts.doughnuts[doughCategory].image)
                            .tap(builder.CardAction.showImage(session, doughnuts.doughnuts[doughCategory].image)),
                    ])
                    .buttons([
                        builder.CardAction.imBack(session, doughnuts.doughnuts[doughCategory].detail[i].name, "Select")
                    ])
                );
                doughSelection.push(doughnuts.doughnuts[doughCategory].detail[i].name);
        }
        let doughCarousel = new builder.Message(session)
            .attachmentLayout(builder.AttachmentLayout.carousel)
            .attachments(doughCards);
        
        builder.Prompts.choice(session, doughCarousel, doughSelection);
    },
    (session, results) => {
        session.dialogData.doughnut = results.response.entity;
        for(let i=0; i<doughnuts.doughnuts[session.dialogData.doughCategory].detail.length; i++){
           if(doughnuts.doughnuts[session.dialogData.doughCategory].detail[i].name === session.dialogData.doughnut){
               session.dialogData.choiceDoughnutId = i;
           }
       }
        var msg = "How many " + session.dialogData.doughnut + " doughnuts are we having?";
        builder.Prompts.choice(session, msg, ['1', '2', '3', '4']);
    },
    (session, results) => {
        let answer = results.response.entity;
        switch(answer){
            case '1':
                session.dialogData.qty = 1;
                session.dialogData.price = doughnuts.doughnuts[session.dialogData.doughCategory].price.single;
                break;
            case '2':
                session.dialogData.qty = 2;
                session.dialogData.price = doughnuts.doughnuts[session.dialogData.doughCategory].price.single;
                break;
            case '3':
                session.dialogData.qty = 3;
                session.dialogData.price = doughnuts.doughnuts[session.dialogData.doughCategory].price.single;
                break;
            case '4':
                session.dialogData.qty = 4;
                session.dialogData.price = doughnuts.doughnuts[session.dialogData.doughCategory].price.single;
                break;
            case 'Pack of 5':
                session.dialogData.qty = 1;
                session.dialogData.price = doughnuts.doughnuts[session.dialogData.doughCategory].price.Packof5;
                break;
            case 'Pack of 10':
                session.dialogData.qty = 1;
                session.dialogData.price = doughnuts.doughnuts[session.dialogData.doughCategory].price.Packof10;
                break;
        }
        session.dialogData.total = session.dialogData.price * session.dialogData.qty;
        session.endDialog();
    }
]