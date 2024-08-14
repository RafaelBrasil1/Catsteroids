class Boss{
    constructor({position,velocity,size,}){
        this.pos = position;
        this.vel = velocity
        this.radius = size;
        this.life = this.radius;
        this.maxlife = this.life;
        this.newlife = 200
        this.nome = 'nome'
        this.cooldown = 100;
        this.dmg = 10;
        this.shoot_sz = 5;
        this.shoot_speed = 3.5;
        

    }

    desenha(){
        //boss
       
        ctx.save();
        ctx.beginPath()
        ctx.strokeStyle = 'red';
        if(this.radius > 0){
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
        }
        ctx.stroke();
        ctx.closePath()
        ctx.restore();

        //boss bar
        
       

        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = 'white';
        ctx.fillStyle = 'red';
        ctx.fillRect(200,65,(this.life/this.maxlife) * 910,45);
        ctx.rect(200,65,910,45);
        ctx.closePath();
        ctx.stroke();
        ctx.restore();

        ctx.save();
        ctx.textAlign = 'center'
        ctx.font = '30px JOYSTIX';
        ctx.fillStyle = 'white';
        ctx.fillText(this.nome,650,43)
        ctx.restore();
        
    }

    updt(){
        this.desenha();

        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
    }


}

let Size = 200;
let boss = new Boss(
    {
        position: {x: canvas.width + Size,y:350},
        velocity: {x: 0, y:0},
        size: Size

    }

)



let nomes = [
    "Daniel", "Gustavo", "Antônio", "Murilo", "Henrique",
    "Paulo", "Mateus", "Felipe", "Pedro", "Vitor",
    "Luiz", "João", "Renan", "Ezequiel", "Davi",
    "Marlon", "Igor", "Lucas", "Nicolas", "Wesley",
    "Pablo", "Vinícius", "André", "Marcelo", "Caio",
    "Bruno", "Leonardo", "Rafael", "Cauê", "Diego",
    "Douglas", "Giovane", "Guilherme", "Jean", "Jorge",
    "Sandro", "Alisson", "Thiago", "Bryan", "David",
    "Allan", "Iuri", "Juliano", "Patrick", "Luan",
    "Caíque", "Danilo", "José", "Bento", "Hector",
    "Gael", "Joaquim", "Vicente", "Pietro", "Enzo",
    "Rael", "Erick", "Israel", "Miguel", "Lucca",
    "Lorenzo", "Benjamim", "Isac", "Bernardo", "Raul",
    "Breno", "Thales", "Estevão", "Kalel", "Samuel",
    "Ian", "Esdras", "Augusto", "Benício", "Caleb",
    "Mathias", "Cauã", "Oliver", "Noah", "Cristiano",
    "Charles", "Fábio", "Lívio", "Tadeu", "Wagner",
    "William", "Manoel", "Wilson", "Renato", "Ulisses",
    "Uriel", "Dominic", "Thaunan", "Elias", "Fabiano",
    "Cícero", "Natã", "Sebastian", "Márcio", "Micael",
    "Aline", "Flávia", "Gabriela", "Juliana", "Camile",
    "Karen", "Leandra", "Magali", "Barbara", "Letícia",
    "Diana", "Beatriz", "Jasmin", "Mari", "Helena",
    "Lilian", "Micaela", "Cássia", "Laura", "Claudia",
    "Maísa", "Catarina", "Iris", "Alana", "Nayara",
    "Brenda", "Giovana", "Alice", "Melissa", "Oriana",
    "Nicole", "Maya", "Paloma", "Jaqueline", "Bia",
    "Carina", "Larissa", "Eduarda", "Carol", "Rafaela",
    "Raquel", "Bianca", "Pietra", "Selena", "Bruna",
    "Aurora", "Jénifer", "Renata", "Linda", "Simone",
    "Raissa", "Pamela", "Carla", "Taís", "Ayla",
    "Luna", "Valentina", "Amanda", "Rita", "Maria",
    "Silvana", "Vivian", "Lívia", "Beatrice", "Virgínia",
    "Karen", "Heloísa", "Glória", "Alícia", "Yara",
    "Bella", "Nina", "Ana", "Mirela", "Antônia",
    "Natasha", "Regina", "Sofia", "Isabel", "Verônica",
    "Emanuela", "Mel", "Laís", "Fabiana", "Joana",
    "Yasmin", "Rute", "Patrícia", "Sabrina", "Rebeca",
    "Caroline", "Joice", "Daniela", "Nídia", "Luana",
    "Luísa", "Isabela", "Lara", "Kayla", "Débora",
    "Jordan", "Noah", "Kauã", "Benício", "Sebastian",
    "Yohan", "Pietro", "Skyler", "Otávio", "Tadeu",
    "Oliver", "Vicent", "Yuri", "Dante", "Xavier",
    "Levi", "Elias", "Bento", "Estevão", "Vicente",
    "Dilan", "Matteo", "Yohan", "Dom", "Ariel",
    "Arlo", "Milo", "Ruan", "Félix", "Rian",
    "Antony", "Óscar", "Anton", "Raylan", "Jonas",
    "Kael", "Adriel", "Xavier", "Otto", "Levi",
    "Gaspar", "Valentino", "David", "Donatello", "Uriel",
    "Zyan", "Martim", "Atlas", "Lorenzo", "Zenon",
    "Lucca", "Isaac", "Bento", "Micah", "Tobias",
    "Fausto", "Luciam", "Kalu", "Rael", "Xande", 
    
    "Sukuna","Gojo Satoru","Naruto","Toji Fushiguro","Zé das Couves",

    "Dominic", "Enrico", "Benjamin", "Ben", "Kalel",
    "Maria Alice", "Cecília", "Maitê", "Liz", "Antonella",
    "Maria Cecília", "Maria Clara", "Manuela", "Sophia",
    "Elisa", "Maria Helena", "Isabella", "Eloá", "Ayla",
    "Lara", "Lívia", "Maria Júlia", "Lorena", "Melissa",
    "Sofia", "Isabela", "Luísa", "Beatriz", "Júlia",
    "Mariana", "Isadora", "Maria Luiza", "Ana Liz", "Rebeca",
    "Isis", "Maria Eduarda", "Aylla", "Esther", "Manuella",
    "Sarah", "Ísis", "Maria Liz", "Olívia", "Lavínia",
    "Ana Laura", "Catarina", "Maria", "Luna", "Ana Clara",
    "Luiza", "Yasmin", "Marina", "Emanuelly", "Giovanna",
    "Jade", "Eloah", "Julia", "Clara", "Maria Luísa",
    "Ana Júlia", "Ester", "Anna Liz", "Agatha", "Stella",
    "Alícia", "Gabriela", "Maria Laura", "Sara", "Maria Flor",
    "Heloisa", "Hellena", "Clarice", "Maria Isis", "Bella",
    "Isabelly", "Melina", "Mirella", "Rafaela", "Vitória",
    "Maria Julia", "Cecilia", "Allana", "Olivia", "Alana",
    "Zoe", "Mariah", "Ana Luiza", "Lunna", "Bianca",
    "Hadassa", "Maria Vitória", "Maria Fernanda", "Luara",
    "Milena", "Ágatha", "Laís", "Ana Cecília", "Ana Beatriz",
    "Miguel", "Heitor", "Gael", "Arthur", "Bernardo",
    "Davi", "Ravi", "Noah", "Samuel", "Théo",
    "Gabriel", "Anthony", "Pedro", "Benício", "Joaquim",
    "Isaac", "Lorenzo", "João Miguel", "Lucas", "Levi",
    "Henrique", "Rafael", "Henry", "Theo", "Nicolas",
    "Murilo", "Guilherme", "Benjamin", "Lucca", "Matheus",
    "Matteo", "Pedro Henrique", "Bento", "Gustavo", "Leonardo",
    "Vicente", "Daniel", "João Pedro", "Emanuel", "Pietro",
    "Davi Lucca", "Bryan", "Felipe", "Enzo Gabriel", "Antony",
    "Mateus", "Anthony Gabriel", "João Lucas", "Augusto",
    "João Guilherme", "Benjamim", "Thomas", "João", "Eduardo",
    "Antônio", "Yuri", "Enzo", "Oliver", "Rael",
    "Otávio", "Francisco", "Rhavi", "João Gabriel", "Nathan",
    "Mathias", "Caio", "Arthur Miguel", "Brayan", "Isaque",
    "José", "Ryan", "Ravi Lucca", "Enrico", "Davi Lucas",
    "Josué", "Benicio", "José Miguel", "Luan", "Luiz Miguel",
    "Ravy", "Vinícius", "Apollo", "Otto", "Theodoro",
    "Yan", "Dom", "Pedro Lucas", "Léo", "Davi Miguel",
    "Valentim", "Caleb", "José Pedro", "Liam", "Dante",
    "Gael Henrique", "Henry Gabriel", "Kevin", "Arthur Gabriel",
    "Asafe", "Erick"
];

