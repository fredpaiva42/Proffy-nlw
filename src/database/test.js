const Database = require('./db')
const creatProffy = require('./createProffy')

Database.then(async(db) =>{
    //Inserir dados

    proffyValue = {
        name: "Frederico Paiva",
        avatar:"https://pbs.twimg.com/profile_images/1208233737986695168/ViabHUhM_400x400.jpg",
        whatsapp:"22998415392", 
        bio:"Entusiasta das melhores tecnologias de química avançada. Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.", 
        
    }

    classValue = {
        subject:1, 
        cost:"20,00", 
        //o proffy_id vira pelo bd
    }

    classScheduleValues = [
        //class_id vira pelo bd
        {
            weekday:0, 
            time_from:320, 
            time_to:1220
        },
        {
            weekday:1, 
            time_from:420, 
            time_to:1220,
        }
    ]

    // await creatProffy(db, {proffyValue, classValue, classScheduleValues})
    //consultar os dados inseridos

    //todos os proffys
    const selctedProffys = await db.all("SELECT * FROM proffys")
    //console.log(selctedProffys)

    //consultar as classes de determinado professor e trazer seus dados
    const selectedClassesAndProffys = await db.all(`
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE classes.proffy_id = 1;
    `)
    //console.log(selectedClassesAndProffys)

    // o horario que a pessoa trabalha é das 8 ate 18
    // o horario do time_from (8h) precisa ser menor  ou igual ao horario solicitado
    //o time_to precisa ser acima
    const selectClassesSchedules = await db.all(`
        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = "1"
        AND class_schedule.weekday = "1"
        AND class_schedule.time_from <= "420"
        AND class_schedule.time_to > "520"
    `)
    console.log(selectClassesSchedules)
})