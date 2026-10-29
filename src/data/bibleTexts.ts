export interface BiblePassage {
  reference: string;
  version: string;
  text: string;
}

export const EMBEDDED_SCRIPTURES: Record<string, string> = {
  // Salmo 95
  'Salmo 95:1-7': `Vinde, cantemos com alegria ao SENHOR;
aclamemos a rocha da nossa salvação.
Entremos em sua presença com ações de graças,
e celebremos com salmos o seu louvor.
Pois o SENHOR é o grande Deus,
o grande Rei acima de todos os deuses.
Em suas mãos estão as profundezas da terra,
e são dele os cumes dos montes.
Dele é o mar, pois foi ele quem o fez,
e as suas mãos formaram a terra firme.
Vinde, adoremos e inclinemo-nos;
ajoelhemo-nos diante do SENHOR, que nos criou.
Pois ele é o nosso Deus,
e nós somos o povo que ele apascenta, o rebanho que ele conduz.`,

  // Salmo 100
  'Salmo 100': `Aclamai ao SENHOR, todos os habitantes da terra!
Servi ao SENHOR com alegria;
vinde à sua presença cantando.
Reconhecei que o SENHOR é Deus: ele nos fez, e a ele pertencemos;
somos o seu povo, o rebanho que ele apascenta.
Entrai por suas portas dando graças, e em seus átrios, com louvor;
dai-lhe graças e bendizei o seu nome.
Pois o SENHOR é bom, e a sua misericórdia dura para sempre;
a sua fidelidade permanece de geração em geração.`,

  // Salmo 23
  'Salmo 23': `O SENHOR é o meu pastor; nada me faltará.
Ele me faz repousar em verdes pastos,
guia-me mansamente a águas tranquilas.
Refrigera a minha alma;
guia-me pelas veredas da justiça, por amor do seu nome.
Ainda que eu ande pelo vale da sombra da morte,
não temerei mal algum, porque tu estás comigo;
a tua vara e o teu cajado me consolam.
Preparas uma mesa perante mim na presença dos meus inimigos;
unges a minha cabeça com óleo, o meu cálice transborda.
Certamente que a bondade e a misericórdia me seguirão todos os dias da minha vida;
e habitarei na Casa do SENHOR por longos dias.`,

  // Salmo 121
  'Salmo 121': `Ergo os olhos para os montes: de onde me virá o socorro?
O meu socorro vem do SENHOR, que fez o céu e a terra.
Ele não deixará que o teu pé vacile; aquele que te guarda não adormece.
Não, não adormece nem dorme aquele que guarda Israel.
O SENHOR é quem te guarda; o SENHOR é a tua sombra, à tua direita.
De dia o sol não te fará mal, nem a lua, de noite.
O SENHOR te guardará de todo mal; ele guardará a tua vida.
O SENHOR guardará a tua saída e a tua chegada, desde agora e para sempre.`,

  // Salmo 91
  'Salmo 91': `Quem habita no abrigo do Altíssimo descansa à sombra do Todo-Poderoso.
Direi ao SENHOR: Tu és o meu refúgio e a minha fortaleza, o meu Deus, em quem confio.
Ele te livrará do laço do caçador e da peste mortal.
Ele te cobrirá com as suas penas, e sob as suas asas encontrarás refúgio; a sua fidelidade é escudo e muralha.
Não temerás o pavor da noite, nem a flecha que voa de dia, nem a peste que avança nas trevas, nem a praga que devasta ao meio-dia.
Mil poderão cair ao teu lado, e dez mil à tua direita, mas nada te atingirá.
Apenas com os teus olhos contemplarás e verás a paga dos ímpios.
Porque fizeste do SENHOR o teu refúgio, e do Altíssimo a tua morada, nenhum mal te sucederá, nenhuma praga chegará à tua tenda.
Pois ele dará ordens aos seus anjos a teu respeito, para te guardarem em todos os teus caminhos.
Eles te levarão nas mãos, para que o teu pé não tropece em pedra alguma.
Pisarás o leão e a víbora, calcarás aos pés o leão jovem e a serpente.
Porque ele se apegou a mim com amor, eu o livrarei; eu o protegerei, pois conhece o meu nome.
Quando ele me invocar, eu lhe responderei; na angústia estarei com ele; eu o livrarei e o honrarei.
Eu o saciarei com longos dias e lhe mostrarei a minha salvação.`,

  // Salmo 4
  'Salmo 4': `Responde-me quando eu clamo, ó Deus, minha justiça! Na aflição me deste alívio;
tem piedade de mim e ouve a minha oração.
Até quando, ó mortais, desonrareis a minha glória, amando o que é vão e buscando a mentira?
Sabei que o SENHOR escolheu para si quem lhe é fiel; o SENHOR me ouve quando eu o invoco.
Tremei e não pequeis; no silêncio do vosso leito, examinai o coração e aquietai-vos.
Oferecei sacrifícios justos e confiai no SENHOR.
Muitos dizem: Quem nos fará ver o bem? Faze brilhar sobre nós, SENHOR, a luz do teu rosto.
Puseste em meu coração mais alegria do que eles têm na fartura do trigo e do vinho.
Em paz me deito e logo adormeço, pois só tu, SENHOR, me fazes viver em segurança.`,

  // Salmo 134
  'Salmo 134': `Bendizei ao SENHOR, todos vós, servos do SENHOR, que permaneceis na casa do SENHOR durante a noite.
Erguei as mãos para o santuário e bendizei ao SENHOR.
De Sião te abençoe o SENHOR, que fez o céu e a terra.`,

  // Salmo 19:1-4, 14
  'Salmo 19': `Os céus proclamam a glória de Deus e o firmamento anuncia a obra das suas mãos.
Um dia discursa a outro dia, e uma noite revela conhecimento a outra noite.
Não há linguagem, nem há palavras, e deles não se ouve nenhum som;
no entanto, por toda a terra se faz ouvir a sua voz, e as suas palavras até aos confins do mundo.
Que as palavras da minha boca e a meditação do meu coração sejam agradáveis a ti, SENHOR, minha rocha e meu redentor!`,

  // Salmo 5:1-3
  'Salmo 5:1-3': `Dá ouvidos às minhas palavras, ó SENHOR,
atende ao meu gemido.
Escuta a voz do meu clamor, Rei meu e Deus meu,
pois a ti orarei.
Pela manhã, SENHOR, ouves a minha voz;
pela manhã te apresento a minha oração e fico esperando.`,

  // Salmo 51:1-12
  'Salmo 51:1-12': `Tem misericórdia de mim, ó Deus, segundo a tua benignidade; apaga as minhas transgressões, segundo a multidão das tuas misericórdias.
Lava-me completamente da minha iniquidade e purifica-me do meu pecado.
Porque eu conheço as minhas transgressões, e o meu pecado está sempre diante de mim.
Cria em mim, ó Deus, um coração puro e renova dentro de mim um espírito reto.
Não me lances fora da tua presença, nem retires de mim o teu Santo Espírito.
Dá-me de novo a alegria da tua salvação e sustenta-me com um espírito disposto.`,

  // Lucas 1:46-55 (Magnificat)
  'Lucas 1:46-55': `A minha alma engrandece o Senhor, e o meu espírito se alegra em Deus, meu Salvador, porque olhou com bondade para a humildade da sua serva.
De agora em diante, todas as gerações me chamarão bem-aventurada, porque o Poderoso fez grandes coisas por mim. Santo é o seu nome.
A sua misericórdia se estende de geração em geração sobre os que o temem.
Ele mostrou a força do seu braço e dispersou os que tinham planos soberbos no coração.
Derrubou os poderosos dos seus tronos e elevou os humildes.
Encheu de bens os famintos e despediu os ricos de mãos vazias.
Socorreu Israel, seu servo, lembrando-se da sua misericórdia, como havia prometido aos nossos pais, a Abraão e à sua descendência, para sempre.`,

  // Lucas 2:29-32 (Nunc Dimittis)
  'Lucas 2:29-32': `Agora, Senhor, despedes em paz o teu servo, conforme a tua palavra;
pois os meus olhos viram a tua salvação, que preparaste diante de todos os povos:
luz que se revela às nações e glória do teu povo, Israel.`,

  // Mateus 5:1-12 (Bem-aventuranças)
  'Mateus 5:1-12': `Vendo Jesus as multidões, subiu ao monte e, como se assentasse, aproximaram-se os seus discípulos; e ele começou a ensiná-los:
Bem-aventurados os humildes de espírito, porque deles é o Reino dos céus.
Bem-aventurados os que choram, porque serão consolados.
Bem-aventurados os mansos, porque herdarão a terra.
Bem-aventurados os que têm fome e sede de justiça, porque serão fartos.
Bem-aventurados os misericordiosos, porque alcançarão misericórdia.
Bem-aventurados os limpos de coração, porque verão a Deus.
Bem-aventurados os pacificadores, porque serão chamados filhos de Deus.
Bem-aventurados os perseguidos por causa da justiça, porque deles é o Reino dos céus.
Alegrai-vos e exultai, porque é grande o vosso galardão nos céus.`,

  // Romanos 8:31-39
  'Romanos 8:31-39': `Que diremos, pois, à vista destas coisas? Se Deus é por nós, quem será contra nós?
Aquele que não poupou o seu próprio Filho, antes, por todos nós o entregou, porventura não nos dará graciosamente com ele todas as coisas?
Quem intentará acusação contra os eleitos de Deus? É Deus quem os justifica.
Quem os condenará? É Cristo Jesus quem morreu, ou antes, quem ressuscitou, o qual está à direita de Deus e também intercede por nós.
Quem nos separará do amor de Cristo? Será a tribulação, ou a angústia, ou a perseguição, ou a fome, ou a nudez, ou o perigo, ou a espada?
Mas em todas estas coisas somos mais que vencedores, por meio daquele que nos amou.
Porque estou bem certo de que nem a morte, nem a vida, nem anjos, nem principados, nem coisas presentes, nem futuras, nem poderes, nem a altura, nem a profundidade, nem qualquer outra criatura poderá separar-nos do amor de Deus, que está em Cristo Jesus, nosso Senhor.`,

  // 1 Pedro 1:3
  '1 Pedro 1:3': `Bendito seja o Deus e Pai de nosso Senhor Jesus Cristo! Em sua grande misericórdia, ele nos fez nascer de novo para uma esperança viva, pela ressurreição de Jesus Cristo dentre os mortos.`,

  // Colossenses 1:12-14
  'Colossenses 1:12-14': `Dai graças ao Pai, que vos tornou dignos de participar da herança dos santos na luz. Ele nos libertou do domínio das trevas e nos transferiu para o Reino do seu Filho amado, em quem temos a redenção, o perdão dos pecados.`,

  // Colossenses 3:1-4
  'Colossenses 3:1-4': `Já que fostes ressuscitados com Cristo, buscai as coisas do alto, onde Cristo está sentado à direita de Deus. Voltai o pensamento para as coisas do alto, e não para as da terra. Pois morrestes, e a vossa vida está escondida com Cristo em Deus. Quando Cristo, que é a vossa vida, for manifestado, então também vós sereis manifestados com ele em glória.`,

  // Malaquias 1:11
  'Malaquias 1:11': `Pois desde o nascente do sol até ao poente, é grande o meu nome entre as nações; e em todo lugar se oferece ao meu nome incenso e uma oferta pura; porque o meu nome é grande entre as nações, diz o SENHOR dos Exércitos.`,

  // 1 João 1:5-7
  '1 João 1:5-7': `Esta é a mensagem que dele ouvimos e vos anunciamos: Deus é luz, e não há nele treva alguma. Se dissermos que temos comunhão com ele, e andarmos nas trevas, mentimos e não praticamos a verdade. Mas, se andarmos na luz, como ele está na luz, temos comunhão uns com os outros, e o sangue de Jesus, seu Filho, nos purifica de todo pecado.`,

  // Romanos 12:1-2
  'Romanos 12:1-2': `Rogo-vos, pois, irmãos, pelas misericórdias de Deus, que apresenteis o vosso corpo por sacrifício vivo, santo e agradável a Deus, que é o vosso culto racional. E não vos conformeis com este século, mas transformai-vos pela renovação da vossa mente, para que experimenteis qual seja a boa, agradável e perfeita vontade de Deus.`,

  // Jeremias 14:9
  'Jeremias 14:9': `Tu estás em nosso meio, ó SENHOR, e nós somos chamados pelo teu nome; não nos desampares!`,

  // Hebreus 7:23-28
  'Hebreus 7:23-28': `E, na verdade, aqueles foram feitos sacerdotes em grande número, porque pela morte foram impedidos de permanecer; mas este, porque permanece eternamente, tem um sacerdócio perpétuo. Portanto, pode também salvar perfeitamente os que por ele se chegam a Deus, vivendo sempre para interceder por eles. Porque nos convinha tal sumo sacerdote, santo, inocente, imaculado, separado dos pecadores e feito mais sublime do que os céus; que não necessitasse, como os sumos sacerdotes, de oferecer cada dia sacrifícios, primeiramente por seus próprios pecados e, depois, pelos do povo; porque isso fez ele, uma vez por todas, oferecendo-se a si mesmo.`,

  // Marcos 10:46-52
  'Marcos 10:46-52': `Depois, foram para Jericó. E, saindo ele de Jericó com seus discípulos e uma grande multidão, Bartimeu, o cego, filho de Timeu, estava assentado junto do caminho, mendigando. E, ouvindo que era Jesus de Nazaré, começou a clamar e a dizer: Jesus, Filho de Davi! Tem misericórdia de mim. E muitos o repreendiam, para que se calasse; mas ele clamava cada vez mais: Filho de Davi! Tem misericórdia de mim. E Jesus, parando, disse que o chamassem; e chamaram o cego, dizendo-lhe: Tem bom ânimo; levanta-te, que ele te chama. E ele, lançando de si a sua capa, levantou-se e foi ter com Jesus. E Jesus, falando, disse-lhe: Que queres que te faça? E o cego lhe disse: Mestre, que eu tenha vista. E Jesus lhe disse: Vai, a tua fé te salvou. E logo viu, e seguia a Jesus pelo caminho.`,

  // Lucas 18:9-14
  'Lucas 18:9-14': `E disse também esta parábola a uns que confiavam em si mesmos, crendo que eram justos, e desprezavam os outros: Dois homens subiram ao templo, para orar; um, fariseu, e o outro, publicano. O fariseu, estando em pé, orava consigo desta maneira: Ó Deus, graças te dou, porque não sou como os demais homens, roubadores, injustos e adúlteros; nem ainda como este publicano. Jejuo duas vezes na semana e dou os dízimos de tudo quanto possuo. O publicano, porém, estando em pé, de longe, nem ainda queria levantar os olhos ao céu, mas batia no peito, dizendo: Ó Deus, tem misericórdia de mim, pecador! Digo-vos que este desceu justificado para sua casa, e não aquele; porque qualquer que a si mesmo se exalta será humilhado, e qualquer que a si mesmo se humilha será exaltado.`,

  // João 9:1-11
  'João 9:1-11': `E, passando Jesus, viu um homem cego de nascença. E os seus discípulos lhe perguntaram, dizendo: Rabi, quem pecou, este ou seus pais, para que nascesse cego? Jesus respondeu: Nem ele pecou nem seus pais; mas foi assim para que se manifestem nele as obras de Deus. Convém que eu faça as obras daquele que me enviou, enquanto é dia; a noite vem, quando ninguém pode trabalhar. Enquanto estou no mundo, sou a luz do mundo. Tendo dito isto, cuspiu na terra, e com a saliva fez lodo, e untou com o lodo os olhos do cego. E disse-lhe: Vai, lava-te no tanque de Siloé (que significa Enviado). Foi, pois, e lavou-se, e voltou vendo.`,

  // 2 Reis 20:12-19
  '2 Reis 20:12-19': `Naquele tempo, Merodaque-Baladã, filho de Baladã, rei da Babilônia, enviou cartas e um presente a Ezequias; porque ouvira que Ezequias tinha estado doente. E Ezequias lhes deu ouvidos e lhes mostrou toda a casa do seu tesouro, a prata, o ouro, as especiarias e os melhores unguentos, e a sua casa de armas, e tudo quanto se achava nos seus tesouros; coisa nenhuma houve que lhes não mostrasse, nem em sua casa, nem em todo o seu domínio. Então, o profeta Isaías veio ao rei Ezequias e lhe disse: Que disseram aqueles homens e de onde vieram a ti? Disse Ezequias: Vieram de uma terra mui distante, da Babilônia. E disse ele: Que viram em tua casa? E disse Ezequias: Tudo quanto há em minha casa viram; coisa nenhuma há nos meus tesouros que eu lhes não mostrasse. Então, disse Isaías a Ezequias: Ouve a palavra do SENHOR: Eis que vêm dias em que tudo quanto houver em tua casa, e o que entesouraram teus pais até ao dia de hoje, será levado para a Babilônia; não ficará coisa alguma, disse o SENHOR.`,

  // Neemias 1:1-11
  'Neemias 1:1-11': `As palavras de Neemias, filho de Hacalias. E sucedeu no mês de Quisleu, no ano vigésimo, estando eu em Susã, a fortaleza, que veio Hanani, um de meus irmãos, ele e alguns de Judá; e perguntei-lhes pelos judeus que escaparam e que restaram do cativeiro e acerca de Jerusalém. E disseram-me: Os restantes, que ficaram do cativeiro, lá na província estão em grande miséria e desprezo; e o muro de Jerusalém, fendido, e as suas portas, queimadas a fogo. E sucedeu que, ouvindo eu estas palavras, assentei-me, e chorei, e lamentei por alguns dias; e estive jejuando e orando perante o Deus dos céus. E disse: Ah! SENHOR, Deus dos céus, Deus grande e temível, que guardas o concerto e a misericórdia para com aqueles que te amam e guardam os teus mandamentos! Estejam, pois, atentos os teus ouvidos, e os teus olhos, abertos, para ouvires a oração do teu servo, que eu hoje faço perante ti, de dia e de noite, pelos filhos de Israel, teus servos.`,

  // Mateus 20:29-34
  'Mateus 20:29-34': `E, saindo eles de Jericó, seguiu-o grande multidão. E eis que dois cegos, assentados junto do caminho, ouvindo que Jesus passava, clamaram, dizendo: Senhor, Filho de Davi, tem misericórdia de nós! E a multidão os repreendia, para que se calassem; eles, porém, cada vez clamavam mais, dizendo: Senhor, Filho de Davi, tem misericórdia de nós! E Jesus, parando, chamou-os e disse: Que quereis que vos faça? Disseram-lhe eles: Senhor, que os nossos olhos se abram. Então, Jesus, movido de íntima compaixão, tocou-lhes nos olhos, e logo seus olhos viram; e eles o seguiram.`
};
