import { CanonicalHour, Canticle, FamilyOffice, WeeklyOffice } from '../types/liturgy';

export const TRADITIONAL_HOURS: CanonicalHour[] = [
  {
    id: 'matutino',
    name: 'Ofício Matutino',
    subtitle: 'Oração da Manhã',
    traditionalTime: '05:00 – 11:00',
    iconName: 'Sun',
    items: [
      {
        id: 'mat-rubric-intro',
        type: 'rubric',
        text: 'Usamos a expressão "Quem oficia" para indicar a pessoa que está dirigindo a Oração, seja clérigo(a) ou leigo(a), exceto nos casos específicos com indicação de presbítero(a) ou bispo(a). As respostas do povo estão em negrito.'
      },
      {
        id: 'mat-heading-open',
        type: 'heading',
        text: 'Sentença de Abertura'
      },
      {
        id: 'mat-rubric-open',
        type: 'rubric',
        text: 'Quem oficia pode iniciar a Oração da Manhã lendo uma sentença de abertura das Escrituras. É costume utilizar uma das seguintes, ou uma das sentenças sazonais.'
      },
      {
        id: 'mat-open-1',
        type: 'versicle',
        speaker: 'Quem oficia',
        text: 'Graça, misericórdia e paz de Deus, nosso Pai, e de Jesus Cristo, nosso Salvador, estejam convosco.'
      },
      {
        id: 'mat-open-1-resp',
        type: 'people',
        speaker: 'Povo',
        text: 'E contigo também.'
      },
      {
        id: 'mat-open-2',
        type: 'versicle',
        speaker: 'Quem oficia',
        text: 'Este é o dia que o Senhor nos fez.'
      },
      {
        id: 'mat-open-2-resp',
        type: 'people',
        speaker: 'Povo',
        text: 'Alegremo-nos e regozijemo-nos nele.'
      },
      {
        id: 'mat-open-alt-rubric',
        type: 'rubric',
        text: 'ou:'
      },
      {
        id: 'mat-open-alt',
        type: 'scripture',
        reference: 'Salmo 19:14',
        text: 'Que as palavras da minha boca e a meditação do meu coração sejam agradáveis a ti, SENHOR, minha rocha e meu redentor!'
      },
      {
        id: 'mat-heading-confession',
        type: 'heading',
        text: 'Confissão de Pecados'
      },
      {
        id: 'mat-conf-exhortation',
        type: 'leader',
        speaker: 'Quem oficia diz:',
        text: 'Amados irmãos, as Escrituras nos ensinam a reconhecermos e confessarmos nossos pecados e ofensas, e que não deveríamos escondê-los diante do nosso Pai Celestial, mas humildemente confessar, tendo um coração penitente e obediente a fim de que possamos obter perdão por sua imensa misericórdia e bondade. Devemos, em todo o tempo, humildemente reconhecer os nossos pecados diante do Senhor Todo-Poderoso, mas principalmente, quando nos congregamos e nos encontramos para a ação de graças pelos grandes benefícios que recebemos de suas mãos, para orar, ouvir sua santa palavra e aprender todas as coisas necessárias para nossa vida e salvação. Portanto, peço a vocês que me acompanhem, com puro coração e voz humilde, até o trono da graça, dizendo:'
      },
      {
        id: 'mat-conf-brief-rubric',
        type: 'rubric',
        text: 'ou:'
      },
      {
        id: 'mat-conf-brief',
        type: 'leader',
        speaker: 'Quem oficia',
        text: 'Confessemos humildemente os nossos pecados a Deus Todo-Poderoso.'
      },
      {
        id: 'mat-silence-1',
        type: 'silence',
        text: 'Guarda-se silêncio por alguns instantes.'
      },
      {
        id: 'mat-conf-prayer-rubric',
        type: 'rubric',
        text: 'De joelhos, quem oficia diz com o povo:'
      },
      {
        id: 'mat-conf-prayer',
        type: 'together',
        speaker: 'Todos',
        text: 'Deus Onipotente e Pai misericordioso, temos errado e nos apartado dos teus caminhos como ovelhas desgarradas. Temos seguido demasiadamente os caprichos e desejos de nossos próprios corações. Temos pecado contra as tuas santas leis. Deixamos de fazer o que devíamos ter feito e temos feito o que não devíamos fazer; e não há nada em nós que seja são. Tu, porém, ó Senhor, tem misericórdia de nós, pobres pecadores. Perdoa os que confessam as suas culpas. Restaura os que se arrependem, segundo as tuas promessas declaradas à humanidade em Cristo Jesus, nosso Senhor. E concede, por amor dele, ó Pai misericordioso, que, de hoje em diante, vivamos uma vida sóbria, justa e piedosa, para a glória do teu santo nome. Amém.'
      },
      {
        id: 'mat-abs-rubric',
        type: 'rubric',
        text: 'Só presbítero(a) ou bispo(a) diz o que segue, de pé; o povo continua de joelhos.'
      },
      {
        id: 'mat-abs-priest',
        type: 'leader',
        speaker: 'Presbítero(a) ou Bispo(a)',
        text: 'Deus Todo-Poderoso, Pai de nosso Senhor Jesus Cristo, que não deseja a morte do pecador, mas que ele se converta da sua maldade e viva, deu aos seus ministros poder e ordem para declarar e pronunciar ao seu povo arrependido a absolvição e a remissão dos seus pecados. Ele perdoa e absolve todos os que verdadeiramente se arrependem e creem sinceramente no seu santo Evangelho. Roguemos-lhe, pois, que nos conceda verdadeiro arrependimento e o seu Santo Espírito, a fim de que as obras que agora fazemos lhe sejam agradáveis; que a nossa vida, de hoje em diante, seja pura e santa; e que, finalmente, alcancemos a bem-aventurança eterna; por Jesus Cristo, nosso Senhor. Amém.'
      },
      {
        id: 'mat-abs-lay-rubric',
        type: 'rubric',
        text: 'Diácono(a) ou leigo(a) pode dizer, de joelhos:'
      },
      {
        id: 'mat-abs-lay',
        type: 'leader',
        speaker: 'Diácono(a) ou Leigo(a)',
        text: 'Que o Pai das misericórdias nos purifique de nossos pecados, e restaure em nós a sua imagem para o louvor e glória de seu nome, por Cristo nosso Senhor. Amém.'
      },
      {
        id: 'mat-heading-invitatory',
        type: 'heading',
        text: 'Invitatório'
      },
      {
        id: 'mat-invit-rubric',
        type: 'rubric',
        text: 'Todos de pé.'
      },
      {
        id: 'mat-inv-1',
        type: 'versicle',
        speaker: 'Quem oficia',
        text: 'Abre, ó Senhor, os nossos lábios.'
      },
      {
        id: 'mat-inv-1-resp',
        type: 'people',
        speaker: 'Povo',
        text: 'E a nossa boca anunciará os teus louvores.'
      },
      {
        id: 'mat-inv-2',
        type: 'versicle',
        speaker: 'Quem oficia',
        text: 'Glória ao Pai, ao Filho, e ao Espírito Santo.'
      },
      {
        id: 'mat-inv-2-resp',
        type: 'people',
        speaker: 'Povo',
        text: 'Como era no princípio, é agora e será sempre, por todos os séculos. Amém.'
      },
      {
        id: 'mat-inv-3',
        type: 'versicle',
        speaker: 'Quem oficia',
        text: 'Louvai ao Senhor.'
      },
      {
        id: 'mat-inv-3-resp',
        type: 'people',
        speaker: 'Povo',
        text: 'O nome do Senhor seja louvado. (Aleluia!)'
      },
      {
        id: 'mat-lent-note',
        type: 'rubric',
        text: 'Durante a Quaresma omite-se o Aleluia.'
      },
      {
        id: 'mat-heading-venite',
        type: 'subheading',
        text: 'Venite, exultemus Domino'
      },
      {
        id: 'mat-venite-rubric',
        type: 'rubric',
        reference: 'Salmo 95:1–7; 96:9, 13',
        text: 'Em seguida, diz-se o Venite. Alternativamente, pode-se usar o Jubilate (Salmo 100) ou Pascha nostrum na Páscoa. Antes e depois, pode-se recitar uma antífona:'
      },
      {
        id: 'mat-antiphon',
        type: 'versicle',
        speaker: 'Antífona',
        text: 'A terra pertence ao Senhor, pois ele a fez: * Vinde, adoremos.'
      },
      {
        id: 'mat-venite-text',
        type: 'together',
        speaker: 'Todos',
        text: `Vinde, cantemos com alegria ao SENHOR; *
aclamemos a rocha da nossa salvação.
Entremos em sua presença com ações de graças, *
e celebremos com salmos o seu louvor.
Pois o SENHOR é o grande Deus, *
o grande Rei acima de todos os deuses.
Em suas mãos estão as profundezas da terra, *
e são dele os cumes dos montes.
Dele é o mar, pois foi ele quem o fez, *
e as suas mãos formaram a terra firme.
Vinde, adoremos e inclinemo-nos; *
ajoelhemo-nos diante do SENHOR, que nos criou.
Pois ele é o nosso Deus, *
e nós somos o povo que ele apascenta, o rebanho que ele conduz.
Adorai o SENHOR no esplendor da santidade; *
diante dele trema toda a terra.
Pois ele vem, vem julgar a terra; *
julgará o mundo com justiça e os povos com a sua fidelidade.`
      },
      {
        id: 'mat-heading-psalms',
        type: 'heading',
        text: 'Salmos do Dia'
      },
      {
        id: 'mat-psalms-rubric',
        type: 'rubric',
        text: 'Dizem-se então um ou mais salmos prescritos no Lecionário para o dia, cada um com o Gloria Patri ao final:'
      },
      {
        id: 'mat-gloria-patri',
        type: 'together',
        speaker: 'Todos',
        text: 'Glória ao Pai e ao Filho; * e ao Espírito Santo; como era no princípio, é agora e será sempre, * por todos os séculos. Amém.'
      },
      {
        id: 'mat-heading-readings',
        type: 'heading',
        text: 'Leituras Bíblicas'
      },
      {
        id: 'mat-readings-rubric',
        type: 'rubric',
        text: 'Fazem-se uma ou mais leituras do Lecionário do dia. Cada leitura se anuncia: "Leitura do Livro de [Nome do Livro]". Ao final: "Palavra do Senhor. Demos graças a Deus". Após cada leitura, diz-se ou canta-se um cântico.'
      },
      {
        id: 'mat-heading-canticle',
        type: 'subheading',
        text: 'Benedictus es, Domine (Uma Canção de Louvor)'
      },
      {
        id: 'mat-canticle-text',
        type: 'together',
        speaker: 'Todos',
        reference: 'Cântico dos Três Jovens, 29–34',
        text: `Bendito és tu, Senhor Deus de nossos pais; *
digno de louvor e de glória para sempre.
Bendito o santo nome de tua Majestade; *
digno de louvor e de glória para sempre.
Bendito és tu no templo de tua santidade; *
digno de louvor e de glória para sempre.
Bendito és tu que sondas os abismos, e presides acima dos Querubins; *
digno de louvor e de glória para sempre.
Bendito és tu sobre o glorioso trono do teu reino; *
digno de louvor e de glória para sempre.
Bendito és tu no firmamento dos céus; *
digno de louvor e de glória para sempre.`
      },
      {
        id: 'mat-heading-creed',
        type: 'heading',
        text: 'Credo Apostólico'
      },
      {
        id: 'mat-creed-rubric',
        type: 'rubric',
        text: 'Estando de pé, todos recitam:'
      },
      {
        id: 'mat-creed-text',
        type: 'together',
        speaker: 'Todos',
        text: `Creio em Deus Pai Todo-Poderoso,
Criador do céu e da terra;
e em Jesus Cristo, seu único Filho, nosso Senhor,
o qual foi concebido por obra do Espírito Santo,
nasceu da Virgem Maria,
padeceu sob o poder de Pôncio Pilatos,
foi crucificado, morto e sepultado,
desceu ao Hades,
ressuscitou ao terceiro dia,
subiu ao Céu,
e está sentado à mão direita de
Deus Pai Todo-Poderoso
donde há de vir a julgar os vivos e os mortos.
Creio no Espírito Santo,
na Santa Igreja Católica,
na Comunhão dos Santos,
na remissão dos pecados,
na ressurreição do corpo
e na Vida eterna. Amém.`
      },
      {
        id: 'mat-heading-prayers',
        type: 'heading',
        text: 'Orações e Súplicas'
      },
      {
        id: 'mat-salutation',
        type: 'versicle',
        speaker: 'Quem oficia',
        text: 'O Senhor seja convosco.'
      },
      {
        id: 'mat-salutation-resp',
        type: 'people',
        speaker: 'Povo',
        text: 'E com teu espírito. (ou: O Senhor está aqui. O seu Espírito está conosco.)'
      },
      {
        id: 'mat-pray-rubric',
        type: 'rubric',
        text: 'O povo se ajoelha ou permanece de pé.'
      },
      {
        id: 'mat-kyrie',
        type: 'together',
        speaker: 'Todos',
        text: `Senhor, tem misericórdia de nós.
Cristo, tem misericórdia de nós.
Senhor, tem misericórdia de nós.`
      },
      {
        id: 'mat-our-father',
        type: 'together',
        speaker: 'Todos oram:',
        text: `Pai nosso, que estás nos céus.
Santificado seja o teu Nome.
Venha o teu Reino.
Seja feita a tua vontade, assim na terra como no céu.
O pão nosso de cada dia nos dá hoje.
Perdoa-nos as nossas dívidas,
assim como nós perdoamos aos nossos devedores.
E não nos deixes cair em tentação,
mas livra-nos do mal;
pois teu é o Reino, o poder e a glória para sempre.
Amém.`
      },
      {
        id: 'mat-suffrages',
        type: 'together',
        speaker: 'Sufrágios',
        text: `Senhor, mostra-nos a tua misericórdia
e concede-nos a tua salvação.
Reveste de santidade teus ministros e ministras,
e enche o teu povo de alegria.
Dá a tua paz ao mundo
pois só em ti achamos segurança.
Toma nossa nação sob teus cuidados;
guia-nos pelas veredas da justiça e da verdade.
Sejam conhecidos na terra os teus propósitos
e entre as nações a tua salvação.
Encontrem os necessitados socorro
e não esmoreça a esperança dos pobres.
Purifica, ó Deus, os nossos corações
e fortalece-nos com o teu Santo Espírito.`
      },
      {
        id: 'mat-heading-collects',
        type: 'heading',
        text: 'Coletas'
      },
      {
        id: 'mat-collect-rubric',
        type: 'rubric',
        text: 'Quem oficia então ora uma ou mais das coletas, começando sempre pela Coleta do Dia (abaixo selecionada do Calendário Cristão). É tradicional orar diariamente as Coletas pela Paz e pela Graça:'
      },
      {
        id: 'mat-collect-peace',
        type: 'collect',
        speaker: 'Coleta pela Paz',
        text: 'Ó Deus, autor da paz e amante da concórdia, conhecer-te é vida eterna, e servir-te é perfeita liberdade: defende-nos, teus humildes servos, para que, seguros por tua proteção, não temamos o poder das forças do mal; mediante Jesus Cristo, nosso Senhor. Amém.'
      },
      {
        id: 'mat-collect-grace',
        type: 'collect',
        speaker: 'Coleta pela Graça',
        text: 'Ó Senhor, nosso Pai celestial, Deus Todo-Poderoso e eterno, que nos conduziste em segurança até o começo deste dia: defende-nos hoje com teu grande poder e não permitas que caiamos em pecado nem que nos exponhamos, por descuido, a qualquer perigo. Concede que, guiados por tua providência, nossos pensamentos e ações sejam bons aos teus olhos; mediante Jesus Cristo, nosso Senhor. Amém.'
      },
      {
        id: 'mat-thanksgiving',
        type: 'together',
        speaker: 'Ação de Graças (Todos oram)',
        text: `Onipotente Deus, Pai de toda a misericórdia, nós te rendemos os mais humildes e sinceros agradecimentos por toda a tua benevolência e carinhosa bondade para conosco e para com todas as pessoas.
Nós te bendizemos por nossa criação, preservação, e por todas as bênçãos desta vida: principalmente por teu inestimável amor na redenção do mundo por nosso Senhor Jesus Cristo, pelos meios de graça, e esperança da glória.
A ti rogamos nos concedas tal apreciação de tuas misericórdias, que nossos corações se encham de sincera gratidão e que proclamemos teus louvores não somente com os nossos lábios, mas com as nossas vidas, entregando-nos inteiramente ao teu serviço e andando perante ti em santidade e retidão todos os nossos dias.
Por Jesus Cristo nosso Senhor, a quem, contigo e o Espírito Santo, seja toda a honra e glória, por séculos sem fim. Amém.`
      },
      {
        id: 'mat-chrysostom',
        type: 'together',
        speaker: 'Oração de São João Crisóstomo',
        text: 'Deus Todo-Poderoso, que nos deste hoje a graça de te dirigirmos as nossas orações, prometendo que onde se congregassem dois ou três em teu nome atenderias as suas petições; cumpre agora, ó Senhor, os desejos e orações de teus servos e servas, segundo a estes mais convier, e concede-nos neste mundo conhecimento da tua verdade e, no vindouro, a vida eterna. Amém.'
      },
      {
        id: 'mat-closing',
        type: 'versicle',
        speaker: 'Quem oficia',
        text: 'Bendigamos ao SENHOR.'
      },
      {
        id: 'mat-closing-resp',
        type: 'people',
        speaker: 'Povo',
        text: 'Graças rendamos a Deus. (Do Dia da Páscoa até Pentecostes acrescenta-se: Aleluia, aleluia!)'
      },
      {
        id: 'mat-benediction',
        type: 'scripture',
        reference: '2 Coríntios 13:14',
        text: 'A graça de nosso Senhor Jesus Cristo, o amor de Deus e a comunhão do Espírito Santo sejam com todos nós para sempre. Amém.'
      }
    ]
  },
  {
    id: 'meio-dia',
    name: 'Ofício do Meio-Dia',
    subtitle: 'Oração do Meio-Dia',
    traditionalTime: '11:00 – 15:00',
    iconName: 'SunMedium',
    items: [
      {
        id: 'mid-heading-open',
        type: 'heading',
        text: 'Abertura'
      },
      {
        id: 'mid-open-1',
        type: 'versicle',
        speaker: 'Quem oficia',
        text: 'Ó Deus, digna-te a livrar-nos.'
      },
      {
        id: 'mid-open-1-resp',
        type: 'people',
        speaker: 'Povo',
        text: 'Senhor, apressa-te em socorrer-nos.'
      },
      {
        id: 'mid-open-2',
        type: 'versicle',
        speaker: 'Quem oficia',
        text: 'Glória ao Pai, ao Filho e ao Espírito Santo.'
      },
      {
        id: 'mid-open-2-resp',
        type: 'people',
        speaker: 'Povo',
        text: 'Como era no princípio, é agora e será sempre, por todos os séculos. Amém. (Aleluia!)'
      },
      {
        id: 'mid-heading-psalm',
        type: 'heading',
        text: 'Salmo do Meio-Dia'
      },
      {
        id: 'mid-psalm-rubric',
        type: 'rubric',
        text: 'Canta-se ou recita-se um ou mais dos salmos seguintes (Salmo 119:105-112, Salmo 121 ou Salmo 126):'
      },
      {
        id: 'mid-psalm-121',
        type: 'together',
        speaker: 'Levavi oculos (Salmo 121)',
        text: `Ergo os olhos para os montes: *
de onde me virá o socorro?
O meu socorro vem do SENHOR, *
que fez o céu e a terra.
Ele não deixará que o teu pé vacile; *
aquele que te guarda não adormece.
Não, não adormece nem dorme *
aquele que guarda Israel.
O SENHOR é quem te guarda; *
o SENHOR é a tua sombra, à tua direita.
De dia o sol não te fará mal, *
nem a lua, de noite.
O SENHOR te guardará de todo mal; *
ele guardará a tua vida.
O SENHOR guardará a tua saída e a tua chegada, *
desde agora e para sempre.
Glória ao Pai, ao Filho e ao Espírito Santo. *
Como era no princípio, é agora e será sempre, por todos os séculos. Amém.`
      },
      {
        id: 'mid-heading-reading',
        type: 'heading',
        text: 'Leitura Breve'
      },
      {
        id: 'mid-reading-text',
        type: 'scripture',
        reference: '2 Coríntios 5:17–18',
        text: 'Se alguém está em Cristo, é nova criação. As coisas antigas já passaram; eis que se fizeram novas. Tudo isso procede de Deus, que, por meio de Cristo, nos reconciliou consigo mesmo e nos confiou o ministério da reconciliação.'
      },
      {
        id: 'mid-reading-resp',
        type: 'together',
        speaker: 'Povo',
        text: 'Palavra do Senhor. Demos graças a Deus.'
      },
      {
        id: 'mid-silence',
        type: 'silence',
        text: 'Pode-se seguir uma meditação, em silêncio ou em voz alta.'
      },
      {
        id: 'mid-heading-prayers',
        type: 'heading',
        text: 'Orações'
      },
      {
        id: 'mid-v1',
        type: 'versicle',
        speaker: 'Quem oficia',
        text: 'Bendirei o Senhor em todo o tempo.'
      },
      {
        id: 'mid-v1-resp',
        type: 'people',
        speaker: 'Povo',
        text: 'O seu louvor estará continuamente em meus lábios.'
      },
      {
        id: 'mid-kyrie',
        type: 'together',
        speaker: 'Todos',
        text: 'Senhor, tem misericórdia de nós. Cristo, tem misericórdia de nós. Senhor, tem misericórdia de nós.'
      },
      {
        id: 'mid-our-father',
        type: 'together',
        speaker: 'Pai Nosso',
        text: `Pai nosso, que estás nos céus. Santificado seja o teu Nome. Venha o teu Reino. Seja feita a tua vontade, assim na terra como no céu. O pão nosso de cada dia nos dá hoje. Perdoa-nos as nossas dívidas, assim como nós perdoamos aos nossos devedores. E não nos deixes cair em tentação, mas livra-nos do mal; pois teu é o Reino, o poder e a glória para sempre. Amém.`
      },
      {
        id: 'mid-heading-collect',
        type: 'heading',
        text: 'Coletas do Meio-Dia'
      },
      {
        id: 'mid-collect-1',
        type: 'collect',
        speaker: 'Pela Salvação na Cruz',
        text: 'Ó bendito Salvador, que nesta hora estiveste suspenso na Cruz, estendendo teus braços de amor: concede que todos os povos da terra olhem para ti e sejam salvos; por tuas ternas misericórdias. Amém.'
      },
      {
        id: 'mid-collect-2',
        type: 'collect',
        speaker: 'Pela Missão',
        text: 'Ó Salvador Todo-Poderoso, que ao meio-dia chamaste teu servo São Paulo para ser apóstolo aos gentios: nós te pedimos que ilumines o mundo com o esplendor da tua glória, para que todas as nações venham e te adorem; pois vives e reinas com o Pai e o Espírito Santo, um só Deus, pelos séculos dos séculos. Amém.'
      },
      {
        id: 'mid-heading-dismissal',
        type: 'heading',
        text: 'Despedida'
      },
      {
        id: 'mid-dismissal-v',
        type: 'versicle',
        speaker: 'Quem oficia',
        text: 'Bendigamos ao SENHOR.'
      },
      {
        id: 'mid-dismissal-resp',
        type: 'people',
        speaker: 'Povo',
        text: 'Graças rendamos a Deus.'
      },
      {
        id: 'mid-grace',
        type: 'scripture',
        reference: '2 Coríntios 13:14',
        text: 'A graça de nosso Senhor Jesus Cristo, o amor de Deus e a comunhão do Espírito Santo sejam com todos nós para sempre. Amém.'
      }
    ]
  },
  {
    id: 'vespertino',
    name: 'Ofício Vespertino',
    subtitle: 'Oração da Tarde',
    traditionalTime: '15:00 – 21:00',
    iconName: 'Sunset',
    items: [
      {
        id: 'vesp-heading-open',
        type: 'heading',
        text: 'Sentença de Abertura'
      },
      {
        id: 'vesp-open-1',
        type: 'versicle',
        speaker: 'Quem oficia',
        text: 'A luz e a paz de Jesus Cristo estejam convosco.'
      },
      {
        id: 'vesp-open-1-resp',
        type: 'people',
        speaker: 'Povo',
        text: 'E também contigo.'
      },
      {
        id: 'vesp-open-2',
        type: 'versicle',
        speaker: 'Quem oficia',
        text: 'A glória de Deus, em Jesus, nos ergueu.'
      },
      {
        id: 'vesp-open-2-resp',
        type: 'people',
        speaker: 'Povo',
        text: 'Alegremo-nos sempre e cantemos ao Senhor.'
      },
      {
        id: 'vesp-heading-confession',
        type: 'heading',
        text: 'Confissão de Pecado'
      },
      {
        id: 'vesp-conf-rubric',
        type: 'rubric',
        text: 'De joelhos, quem oficia diz com o povo:'
      },
      {
        id: 'vesp-conf-prayer',
        type: 'together',
        speaker: 'Todos',
        text: 'Deus muitíssimo misericordioso, Pai de nosso Senhor Jesus Cristo, nós confessamos que temos pecado em pensamento, palavra e ação. Não te amamos de todo o coração. Não amamos o próximo como a nós mesmos. Em tua misericórdia, perdoa o que fomos, emenda o que somos e dirige o que seremos; que possamos fazer o que é justo, amar sem interesses e caminhar humildemente contigo, nosso Deus. Amém.'
      },
      {
        id: 'vesp-abs-rubric',
        type: 'rubric',
        text: 'Presbítero(a) ou Bispo(a) de pé, ou leigo(a) de joelhos:'
      },
      {
        id: 'vesp-abs-lay',
        type: 'leader',
        speaker: 'Diácono(a) ou Leigo(a)',
        text: 'Que o Pai das misericórdias nos purifique de nossos pecados, e restaure em nós a sua imagem para o louvor e glória de seu nome, por Cristo nosso Senhor. Amém.'
      },
      {
        id: 'vesp-heading-invitatory',
        type: 'heading',
        text: 'Invitatório e Cântico da Luz'
      },
      {
        id: 'vesp-inv-1',
        type: 'versicle',
        speaker: 'Quem oficia',
        text: 'Abre, ó Senhor, os nossos lábios.'
      },
      {
        id: 'vesp-inv-1-resp',
        type: 'people',
        speaker: 'Povo',
        text: 'E a nossa boca anunciará os teus louvores.'
      },
      {
        id: 'vesp-heading-phos',
        type: 'subheading',
        text: 'Phos hilaron (Luz Radiante)'
      },
      {
        id: 'vesp-phos-text',
        type: 'together',
        speaker: 'Todos',
        text: `Salve, alegre luz, puro esplendor *
da gloriosa face paternal.
Salve, Jesus, bendito Salvador, *
Cristo ressuscitado e imortal.
No horizonte o sol já declinou, *
brilham da noite as luzes cintilantes:
ao Pai, ao Filho, ao Espírito de amor *
cantemos nossos hinos exultantes.
De santas vozes sobe a adoração *
prestada a ti, Jesus, Filho de Deus.
A criação inteira canta glória, *
o universo, a terra, os novos céus.`
      },
      {
        id: 'vesp-heading-psalms',
        type: 'heading',
        text: 'Salmos do Dia'
      },
      {
        id: 'vesp-gloria',
        type: 'together',
        speaker: 'Todos',
        text: 'Glória ao Pai e ao Filho; * e ao Espírito Santo; como era no princípio, é agora e será sempre, * por todos os séculos. Amém.'
      },
      {
        id: 'vesp-heading-readings',
        type: 'heading',
        text: 'Leituras Bíblicas do Dia'
      },
      {
        id: 'vesp-heading-magnificat',
        type: 'subheading',
        text: 'Magnificat (Cântico de Maria)'
      },
      {
        id: 'vesp-magnificat-text',
        type: 'together',
        speaker: 'Todos',
        reference: 'Lucas 1:46–55',
        text: `A minha alma engrandece o Senhor, *
e o meu espírito se alegra em Deus, meu Salvador,
porque olhou com bondade *
para a humildade da sua serva.
De agora em diante, *
todas as gerações me chamarão bem-aventurada,
porque o Poderoso fez grandes coisas por mim. *
Santo é o seu nome.
A sua misericórdia se estende de geração em geração *
sobre os que o temem.
Ele mostrou a força do seu braço *
e dispersou os que tinham planos soberbos no coração.
Derrubou os poderosos dos seus tronos *
e elevou os humildes.
Encheu de bens os famintos *
e despediu os ricos de mãos vazias.
Socorreu Israel, seu servo, lembrando-se da sua misericórdia, *
como havia prometido aos nossos pais, a Abraão e à sua descendência, para sempre.
Glória ao Pai e ao Filho; * e ao Espírito Santo;
como era no princípio, é agora e será sempre, * por todos os séculos. Amém.`
      },
      {
        id: 'vesp-heading-nunc',
        type: 'subheading',
        text: 'Nunc dimittis (Cântico de Simeão)'
      },
      {
        id: 'vesp-nunc-text',
        type: 'together',
        speaker: 'Todos',
        reference: 'Lucas 2:29–32',
        text: `Agora, Senhor, despedes em paz o teu servo, *
conforme a tua palavra;
pois os meus olhos viram a tua salvação, *
que preparaste diante de todos os povos:
luz que se revela às nações *
e glória do teu povo, Israel.
Glória ao Pai, ao Filho e ao Espírito Santo. *
Como era no princípio, é agora e será sempre, por todos os séculos. Amém.`
      },
      {
        id: 'vesp-heading-creed',
        type: 'heading',
        text: 'Credo Apostólico'
      },
      {
        id: 'vesp-creed-text',
        type: 'together',
        speaker: 'Todos',
        text: `Creio em Deus Pai Todo-Poderoso, Criador do céu e da terra; e em Jesus Cristo, seu único Filho, nosso Senhor, o qual foi concebido por obra do Espírito Santo, nasceu da Virgem Maria, padeceu sob o poder de Pôncio Pilatos, foi crucificado, morto e sepultado, desceu ao Hades, ressuscitou ao terceiro dia, subiu ao Céu, e está sentado à mão direita de Deus Pai Todo-Poderoso donde há de vir a julgar os vivos e os mortos. Creio no Espírito Santo, na Santa Igreja Católica, na Comunhão dos Santos, na remissão dos pecados, na ressurreição do corpo e na Vida eterna. Amém.`
      },
      {
        id: 'vesp-heading-prayers',
        type: 'heading',
        text: 'Orações'
      },
      {
        id: 'vesp-our-father',
        type: 'together',
        speaker: 'Pai Nosso',
        text: `Pai nosso, que estás nos céus. Santificado seja o teu Nome. Venha o teu Reino. Seja feita a tua vontade, assim na terra como no céu. O pão nosso de cada dia nos dá hoje. Perdoa-nos as nossas dívidas, assim como nós perdoamos aos nossos devedores. E não nos deixes cair em tentação, mas livra-nos do mal; pois teu é o Reino, o poder e a glória para sempre. Amém.`
      },
      {
        id: 'vesp-suffrages-night',
        type: 'together',
        speaker: 'Súplicas da Noite',
        text: `Para que esta noite seja santa, boa e tranquila,
Nós te suplicamos, ó Senhor.
Para que teus santos anjos nos conduzam por caminhos de paz e boa vontade,
Nós te suplicamos, ó Senhor.
Para que sejamos perdoados e absolvidos de nossos pecados e ofensas,
Nós te suplicamos, ó Senhor.
Para que haja paz em tua Igreja e em todo o mundo,
Nós te suplicamos, ó Senhor.
Para que partamos desta vida na tua fé e no teu temor, e não sejamos condenados diante do grande tribunal de Cristo,
Nós te suplicamos, ó Senhor.
Para que sejamos unidos pelo teu Santo Espírito na comunhão de todos os teus santos, entregando-nos uns aos outros e toda a nossa vida a Cristo,
Nós te suplicamos, ó Senhor.`
      },
      {
        id: 'vesp-heading-collects',
        type: 'heading',
        text: 'Coletas Vespertinas'
      },
      {
        id: 'vesp-collect-peace',
        type: 'collect',
        speaker: 'Coleta pela Paz',
        text: 'Ó Deus, de quem procedem os desejos santos, os retos conselhos e os atos de justiça; concede a nós, teus servos, a paz que o mundo não nos pode dar, a fim de que nossos corações se dediquem a cumprir teus mandamentos, e, livres do temor de nossos inimigos, vivamos em paz e tranquilidade; pelos merecimentos de Jesus Cristo, nosso Senhor. Amém.'
      },
      {
        id: 'vesp-collect-night',
        type: 'collect',
        speaker: 'Coleta contra os Perigos da Noite',
        text: 'Ilumina, suplicamos-te, Senhor Deus, as nossas trevas; e misericordioso, defende-nos de todos os perigos e ciladas desta noite; por amor de teu único Filho, nosso Salvador Jesus Cristo. Amém.'
      },
      {
        id: 'vesp-thanksgiving',
        type: 'together',
        speaker: 'Ação de Graças',
        text: 'Onipotente Deus, Pai de toda a misericórdia, nós te rendemos os mais humildes e sinceros agradecimentos por toda a tua benevolência e carinhosa bondade para conosco e para com todas as pessoas. Nós te bendizemos por nossa criação, preservação, e por todas as bênçãos desta vida: principalmente por teu inestimável amor na redenção do mundo por nosso Senhor Jesus Cristo, pelos meios de graça, e esperança da glória. Amém.'
      },
      {
        id: 'vesp-dismissal',
        type: 'versicle',
        speaker: 'Quem oficia',
        text: 'Bendigamos ao SENHOR. Graças rendamos a Deus.'
      },
      {
        id: 'vesp-benediction',
        type: 'scripture',
        reference: 'Efésios 3:20–21',
        text: 'Glória a Deus, cujo poder, agindo em nós, é capaz de fazer infinitamente mais do que tudo quanto podemos pedir ou imaginar. A ele seja a glória, de geração em geração, na Igreja e em Cristo Jesus, para todo o sempre. Amém.'
      }
    ]
  },
  {
    id: 'completas',
    name: 'Completas',
    subtitle: 'Oração ao Fim do Dia',
    traditionalTime: '21:00 – 05:00',
    iconName: 'Moon',
    items: [
      {
        id: 'comp-silence-open',
        type: 'silence',
        text: 'Guarda-se um momento de silêncio.'
      },
      {
        id: 'comp-heading-open',
        type: 'heading',
        text: 'Abertura'
      },
      {
        id: 'comp-open-1',
        type: 'versicle',
        speaker: 'Quem oficia',
        text: 'O Senhor Onipotente nos conceda uma noite tranquila e a paz na derradeira hora.'
      },
      {
        id: 'comp-open-1-resp',
        type: 'people',
        speaker: 'Povo',
        text: 'Amém.'
      },
      {
        id: 'comp-heading-confession',
        type: 'heading',
        text: 'Confissão de Pecado'
      },
      {
        id: 'comp-conf-prayer',
        type: 'together',
        speaker: 'Todos dizem:',
        text: 'Deus Todo-Poderoso e Pai, confessamos diante de ti, uns aos outros e de toda a companhia celestial que pecamos por nossa própria culpa, em pensamentos, palavras e ações, e no bem que deixamos de fazer. Por amor de teu Filho, nosso Senhor Jesus Cristo, tem misericórdia de nós, perdoa os nossos pecados e, pelo poder do teu Santo Espírito, levanta-nos para te servirmos em novidade de vida, para a glória do teu Nome. Amém.'
      },
      {
        id: 'comp-abs',
        type: 'together',
        speaker: 'Quem oficia',
        text: 'Deus Onipotente tenha misericórdia de nós; perdoe os nossos pecados; e nos guarde na vida eterna. Amém.'
      },
      {
        id: 'comp-heading-psalm',
        type: 'heading',
        text: 'Salmo das Completas'
      },
      {
        id: 'comp-psalm-91',
        type: 'together',
        speaker: 'Qui habitat (Salmo 91)',
        text: `Quem habita no abrigo do Altíssimo *
descansa à sombra do Todo-Poderoso.
Direi ao SENHOR: Tu és o meu refúgio e a minha fortaleza, *
o meu Deus, em quem confio.
Ele te livrará do laço do caçador *
e da peste mortal.
Ele te cobrirá com as suas penas, e sob as suas asas encontrarás refúgio; *
a sua fidelidade é escudo e muralha.
Não temerás o pavor da noite, *
nem a flecha que voa de dia,
nem a peste que avança nas trevas, *
nem a praga que devasta ao meio-dia.
Mil poderão cair ao teu lado, e dez mil à tua direita, *
mas nada te atingirá.
Apenas com os teus olhos contemplarás *
e verás a paga dos ímpios.
Porque fizeste do SENHOR o teu refúgio, *
e do Altíssimo a tua morada,
nenhum mal te sucederá, *
nenhuma praga chegará à tua tenda.
Pois ele dará ordens aos seus anjos a teu respeito, *
para te guardarem em todos os teus caminhos.
Eles te levarão nas mãos, *
para que o teu pé não tropece em pedra alguma.
Pisarás o leão e a víbora, *
calcarás aos pés o leão jovem e a serpente.
Porque ele se apegou a mim com amor, eu o livrarei; *
eu o protegerei, pois conhece o meu nome.
Quando ele me invocar, eu lhe responderei; na angústia estarei com ele; *
eu o livrarei e o honrarei.
Eu o saciarei com longos dias *
e lhe mostrarei a minha salvação.
Glória ao Pai e ao Filho; * e ao Espírito Santo;
como era no princípio, é agora e será sempre, * por todos os séculos. Amém.`
      },
      {
        id: 'comp-heading-reading',
        type: 'heading',
        text: 'Leitura Breve'
      },
      {
        id: 'comp-reading-text',
        type: 'scripture',
        reference: 'Mateus 11:28–30',
        text: 'Venham a mim todos vocês que estão cansados e sobrecarregados, e eu lhes darei descanso. Tomem sobre vocês o meu jugo e aprendam de mim, pois sou manso e humilde de coração, e encontrarão descanso para as suas almas. Pois o meu jugo é suave, e o meu fardo é leve.'
      },
      {
        id: 'comp-reading-resp',
        type: 'together',
        speaker: 'Povo',
        text: 'Palavra do Senhor. Demos graças a Deus.'
      },
      {
        id: 'comp-heading-responsory',
        type: 'heading',
        text: 'Responsório'
      },
      {
        id: 'comp-responsory-text',
        type: 'together',
        speaker: 'Todos',
        text: `Em tuas mãos, ó Senhor, entrego o meu espírito;
Em tuas mãos, ó Senhor, entrego o meu espírito;
Pois tu me redimiste, ó Senhor, Deus da verdade.
Entrego o meu espírito;
Guarda-me, ó Senhor, como a menina dos teus olhos;
Esconde-me à sombra de tuas asas.`
      },
      {
        id: 'comp-heading-prayers',
        type: 'heading',
        text: 'Orações'
      },
      {
        id: 'comp-kyrie',
        type: 'together',
        speaker: 'Todos',
        text: 'Senhor, tem misericórdia de nós. Cristo, tem misericórdia de nós. Senhor, tem misericórdia de nós.'
      },
      {
        id: 'comp-our-father',
        type: 'together',
        speaker: 'Pai Nosso',
        text: 'Pai nosso, que estás nos céus. Santificado seja o teu Nome. Venha o teu Reino. Seja feita a tua vontade, assim na terra como no céu. O pão nosso de cada dia nos dá hoje. Perdoa-nos as nossas dívidas, assim como nós perdoamos aos nossos devedores. E não nos deixes cair em tentação, mas livra-nos do mal; pois teu é o Reino, o poder e a glória para sempre. Amém.'
      },
      {
        id: 'comp-heading-collects',
        type: 'heading',
        text: 'Coletas da Noite'
      },
      {
        id: 'comp-collect-1',
        type: 'collect',
        speaker: 'Pela Proteção Angelical',
        text: 'Visita este lugar, ó Senhor, e afasta para longe dele todas as ciladas do mal; habitem conosco os teus santos anjos, para nos guardarem em paz; e permaneça sempre sobre nós a tua bênção; por Jesus Cristo, nosso Senhor. Amém.'
      },
      {
        id: 'comp-collect-2',
        type: 'collect',
        speaker: 'Pelo Descanso Tranquilo',
        text: 'Senhor, sê tu a nossa luz durante a noite e concede-nos um descanso tranquilo; para que amanhã nos levantemos em teu nome, e contemplemos alegres e felizes o novo dia. Por Jesus Cristo, nosso Senhor. Amém.'
      },
      {
        id: 'comp-collect-watchers',
        type: 'collect',
        speaker: 'Pelos que Trabalham ou Sofrem na Noite',
        text: 'Senhor de misericórdia, lembra-te nesta noite de todos os que permanecem acordados por causa do trabalho, da dor ou da preocupação. Concede repouso aos que dormem e sustenta os que não conseguem descansar. Ampara os doentes, renova as forças dos cansados, permanece junto dos que se aproximam do fim da vida, conforta os que choram e fortalece os que atravessam tempos de aflição. Guarda também os que vivem momentos de alegria, para que reconheçam em ti a fonte de todo bem. Recebe, ó Senhor, estas nossas súplicas, confiados em teu amor e tua bondade. Amém.'
      },
      {
        id: 'comp-heading-antiphon',
        type: 'subheading',
        text: 'Antífona e Cântico de Simeão'
      },
      {
        id: 'comp-antiphon-1',
        type: 'versicle',
        speaker: 'Antífona (Todos)',
        text: `Guia-nos, Senhor, durante o dia,
e guarda-nos enquanto dormimos.
Que em nosso despertar
vigiemos com Cristo
e, no silêncio da noite,
descansemos em paz.`
      },
      {
        id: 'comp-nunc',
        type: 'together',
        speaker: 'Nunc dimittis (Lucas 2:29–32)',
        text: `Agora, Senhor, despedes em paz o teu servo, *
conforme a tua palavra;
pois os meus olhos viram a tua salvação, *
que preparaste diante de todos os povos:
luz que se revela às nações *
e glória do teu povo, Israel.
Glória ao Pai, ao Filho e ao Espírito Santo. *
Como era no princípio, é agora e será sempre, por todos os séculos. Amém.`
      },
      {
        id: 'comp-antiphon-repeat',
        type: 'versicle',
        speaker: 'Antífona (Todos)',
        text: `Guia-nos, Senhor, durante o dia,
e guarda-nos enquanto dormimos.
Que em nosso despertar
vigiemos com Cristo
e, no silêncio da noite,
descansemos em paz.`
      },
      {
        id: 'comp-blessing',
        type: 'leader',
        speaker: 'Bênção',
        text: 'O Senhor Todo-Poderoso e misericordioso, Pai, Filho e Espírito Santo, nos abençoe e nos guarde nesta noite e para sempre. Amém.'
      }
    ]
  }
];

export const CANTICLES: Canticle[] = [
  {
    id: 'te-deum',
    latinTitle: 'Te Deum laudamus',
    portugueseTitle: 'Nós te louvamos, ó Deus',
    seasonRecommendation: 'Especialmente apropriado para a Oração da Manhã.',
    reference: 'Hino Tradicional da Igreja Primitiva',
    verses: [
      { call: 'Nós te louvamos, ó Deus; nós te aclamamos Senhor;', response: 'toda a criação te adora, Pai eterno.' },
      { call: 'A ti todos os anjos, todos os poderes do céu,', response: 'os querubins e os serafins cantam em louvor sem fim:' },
      { call: 'Santo, Santo, Santo, Senhor Deus do poder e da força,', response: 'o céu e a terra estão cheios da tua glória.' },
      { call: 'O glorioso coro dos apóstolos te louva.', response: 'A nobre assembleia dos profetas te louva.' },
      { call: 'O exército dos mártires, vestidos de branco, te louva.', response: 'Por toda a terra a santa Igreja te aclama:' },
      { call: 'Pai, de majestade sem limites, o teu verdadeiro e único Filho, digno de todo louvor,', response: 'e o Espírito Santo, advogado e guia.' },
      { call: 'Tu, ó Cristo, és o Rei da glória,', response: 'o Filho eterno do Pai.' },
      { call: 'Para nos libertar, assumiste a nossa carne', response: 'e escolheste com humildade o seio da Virgem.' },
      { call: 'Venceste o aguilhão da morte', response: 'e abriste o Reino dos céus a todos os que creem.' },
      { call: 'Estás sentado à direita de Deus, na glória.', response: 'Cremos que virás para ser o nosso juiz.' },
      { call: 'Vem, pois, Senhor, e socorre o teu povo,', response: 'que resgataste com o preço do teu próprio sangue,' },
      { call: 'e leva-nos com os teus santos', response: 'à glória eterna.' },
      { call: 'Salva o teu povo, Senhor, e abençoa a tua herança;', response: 'governa-o e sustenta-o, agora e sempre.' },
      { call: 'Dia após dia nós te bendizemos;', response: 'louvamos o teu nome para sempre.' },
      { call: 'Guarda-nos hoje, Senhor, de todo pecado;', response: 'tem misericórdia de nós, Senhor, tem misericórdia.' },
      { call: 'Senhor, mostra-nos o teu amor e a tua misericórdia,', response: 'pois em ti pusemos a nossa confiança.' },
      { call: 'Em ti, Senhor, está a nossa esperança;', response: 'não sejamos jamais confundidos.' }
    ]
  },
  {
    id: 'benedictus-dominus',
    latinTitle: 'Benedictus Dominus Deus',
    portugueseTitle: 'Cântico de Zacarias',
    seasonRecommendation: 'Especialmente apropriado para a Oração da Manhã.',
    reference: 'Lucas 1:68–79',
    verses: [
      { call: 'Bendito seja o Senhor, o Deus de Israel;', response: 'ele veio ao seu povo e o libertou.' },
      { call: 'Suscitou para nós um poderoso salvador,', response: 'nascido da casa de Davi, seu servo.' },
      { call: 'Pela boca dos seus santos profetas prometeu, desde os tempos antigos,', response: 'que nos salvaria dos nossos inimigos, das mãos de todos os que nos odeiam.' },
      { call: 'Prometeu mostrar misericórdia aos nossos pais', response: 'e lembrar-se da sua santa aliança.' },
      { call: 'Este foi o juramento que fez a Abraão, nosso pai: libertar-nos das mãos dos nossos inimigos,', response: 'para que o sirvamos sem medo, em santidade e justiça diante dele, todos os dias da nossa vida.' },
      { call: 'E tu, menino, serás chamado profeta do Altíssimo,', response: 'pois irás adiante do Senhor para preparar o seu caminho,' },
      { call: 'para dar ao seu povo o conhecimento da salvação', response: 'pelo perdão dos seus pecados.' },
      { call: 'Pela terna misericórdia do nosso Deus,', response: 'o sol nascente do alto virá nos visitar,' },
      { call: 'para iluminar os que vivem nas trevas e na sombra da morte,', response: 'e guiar os nossos pés no caminho da paz.' }
    ]
  },
  {
    id: 'magna-et-mirabilia',
    latinTitle: 'Magna et mirabilia',
    portugueseTitle: 'Cântico dos Redimidos',
    seasonRecommendation: 'Especialmente apropriado para o Advento e o Tempo Pascal.',
    reference: 'Apocalipse 15:3–4',
    verses: [
      { call: 'Ó Soberano do universo, Senhor Deus, grandes são as obras que realizaste,', response: 'e ultrapassam todo o entendimento humano.' },
      { call: 'Os teus caminhos são caminhos de justiça e de verdade,', response: 'ó Rei de todos os séculos.' },
      { call: 'Quem não te prestará homenagem, Senhor, e não cantará os louvores do teu nome?', response: 'Pois só tu és o Santo.' },
      { call: 'Todas as nações virão e se prostrarão diante de ti,', response: 'porque os teus atos de justiça e santidade foram revelados.' }
    ]
  },
  {
    id: 'surge-illuminare',
    latinTitle: 'Surge, illuminare',
    portugueseTitle: 'Levanta-te, resplandece',
    seasonRecommendation: 'Especialmente apropriado para o tempo depois da Epifania.',
    reference: 'Isaías 60:1–3, 11, 14, 18–19',
    verses: [
      { call: 'Levanta-te e resplandece, pois chegou a tua luz,', response: 'e a glória do SENHOR raiou sobre ti.' },
      { call: 'Pois eis que as trevas cobrem a terra, e densa escuridão envolve os povos.', response: 'Mas sobre ti se levanta o SENHOR, e a sua glória se manifesta sobre ti.' },
      { call: 'As nações virão à tua luz,', response: 'e os reis, ao resplendor da tua aurora.' },
      { call: 'As tuas portas estarão sempre abertas; nem de dia nem de noite se fecharão.', response: 'Chamar-te-ão Cidade do SENHOR, Sião do Santo de Israel.' },
      { call: 'Não se ouvirá mais falar de violência na tua terra,', response: 'nem de ruína ou destruição dentro das tuas fronteiras.' },
      { call: 'Aos teus muros chamarás Salvação, e às tuas portas, Louvor.', response: 'O SENHOR será a tua luz para sempre, e o teu Deus será a tua glória.' }
    ]
  },
  {
    id: 'kyrie-pantokrator',
    latinTitle: 'Kyrie Pantokrator',
    portugueseTitle: 'Cântico de Penitência',
    seasonRecommendation: 'Especialmente apropriado para a Quaresma.',
    reference: 'Oração de Manassés 1–2, 4, 6–7, 11–15',
    verses: [
      { call: 'Ó Senhor, Soberano dos exércitos celestes, Deus de Abraão, de Isaque e de Jacó:', response: 'tu fizeste os céus e a terra, com tudo o que neles existe.' },
      { call: 'Todas as coisas estremecem diante de ti; tremem por causa do teu poder.', response: 'Mas a tua promessa de misericórdia não tem medida; ultrapassa tudo o que a nossa mente pode compreender.' },
      { call: 'E agora, ó Senhor, dobro os joelhos do meu coração e te suplico:', response: 'Pequei, ó Senhor, pequei, e conheço bem a minha maldade.' },
      { call: 'Por isso te faço esta oração: perdoa-me, Senhor, perdoa-me.', response: 'Não me deixes perecer no meu pecado, nem me condenes às profundezas da terra.' },
      { call: 'Pois tu, Senhor, és o Deus dos que se arrependem,', response: 'e em mim mostrarás a tua bondade.' }
    ]
  },
  {
    id: 'cantate-domino',
    latinTitle: 'Cantate Domino',
    portugueseTitle: 'Cantai ao Senhor',
    seasonRecommendation: 'Apropriado para o Tempo Pascal e fora dos tempos penitenciais.',
    reference: 'Salmo 98',
    verses: [
      { call: 'Cantai ao SENHOR um cântico novo, pois ele fez maravilhas;', response: 'a sua mão direita e o seu braço santo lhe deram a vitória.' },
      { call: 'O SENHOR deu a conhecer a sua salvação;', response: 'revelou a sua justiça diante das nações.' },
      { call: 'Aclamai o SENHOR, toda a terra; alegrai-vos, exultai e cantai louvores.', response: 'Cantai louvores ao SENHOR com a harpa e ao som da trompa diante do Rei, o SENHOR.' }
    ]
  },
  {
    id: 'benedicite',
    latinTitle: 'Benedicite, omnia opera Domini',
    portugueseTitle: 'Cântico da Criação',
    seasonRecommendation: 'Especialmente apropriado para o sábado.',
    reference: 'Cântico dos Três Jovens 35–65',
    verses: [
      { call: 'Glorificai o Senhor, todas as obras do Senhor,', response: 'louvai-o e exaltai-o para sempre.' },
      { call: 'No firmamento do seu poder, glorificai o Senhor,', response: 'louvai-o e exaltai-o para sempre.' },
      { call: 'Sol, lua e estrelas do céu, glorificai o Senhor,', response: 'louvai-o e exaltai-o para sempre.' },
      { call: 'Glorificai o Senhor, chuvas e orvalhos, todos os ventos, o fogo e o calor.', response: 'louvai-o e exaltai-o para sempre.' },
      { call: 'Que a terra glorifique o Senhor,', response: 'louvai-o e exaltai-o para sempre.' },
      { call: 'Glorifiquemos o Senhor: Pai, Filho e Espírito Santo;', response: 'louvai-o e exaltai-o para sempre.' }
    ]
  }
];

export const FAMILY_OFFICES: FamilyOffice[] = [
  {
    id: 'manha',
    name: 'Pela Manhã',
    subtitle: 'Ofício Breve para Famílias e Indivíduos',
    items: [
      { id: 'fam-m-1', type: 'scripture', reference: 'Salmo 51:15', text: 'Abre, ó Senhor, os meus lábios, e a minha boca proclamará o teu louvor.' },
      { id: 'fam-m-2', type: 'together', speaker: 'Miserere mei, Deus (Salmo 51:10–12)', text: 'Cria em mim, ó Deus, um coração puro * e renova dentro de mim um espírito reto. Não me lances fora da tua presença, * nem retires de mim o teu Santo Espírito. Dá-me de novo a alegria da tua salvação * e sustenta-me com um espírito disposto. Glória ao Pai, ao Filho e ao Espírito Santo. * Como era no princípio, é agora e será sempre, por todos os séculos. Amém.' },
      { id: 'fam-m-3', type: 'scripture', reference: '1 Pedro 1:3', text: 'Bendito seja o Deus e Pai de nosso Senhor Jesus Cristo! Em sua grande misericórdia, ele nos fez nascer de novo para uma esperança viva, pela ressurreição de Jesus Cristo dentre os mortos.' },
      { id: 'fam-m-4', type: 'together', speaker: 'Pai-Nosso', text: 'Pai nosso, que estás nos céus. Santificado seja o teu Nome. Venha o teu Reino. Seja feita a tua vontade, assim na terra como no céu. O pão nosso de cada dia nos dá hoje. Perdoa-nos as nossas dívidas, assim como nós perdoamos aos nossos devedores. E não nos deixes cair em tentação, mas livra-nos do mal; pois teu é o Reino, o poder e a glória para sempre. Amém.' },
      { id: 'fam-m-5', type: 'collect', speaker: 'Coleta da Manhã', text: 'Ó Senhor, nosso Pai celestial, Deus Todo-Poderoso e eterno, que nos conduziste em segurança até o começo deste dia: defende-nos hoje com teu grande poder e não permitas que caiamos em pecado nem que nos exponhamos, por descuido, a qualquer perigo. Concede que, guiados por tua providência, nossos pensamentos e ações sejam bons aos teus olhos; mediante Jesus Cristo, nosso Senhor. Amém.' }
    ]
  },
  {
    id: 'meio-dia',
    name: 'Ao Meio-Dia',
    subtitle: 'Ofício Breve para Famílias e Indivíduos',
    items: [
      { id: 'fam-md-1', type: 'scripture', reference: 'Efésios 1:3', text: 'Bendito seja o Deus e Pai de nosso Senhor Jesus Cristo, que nos abençoou em Cristo com todas as bênçãos espirituais nos lugares celestiais.' },
      { id: 'fam-md-2', type: 'together', speaker: 'Laudate, pueri (Salmo 113:1–4)', text: 'Louvai o SENHOR! Cantai louvores, servos do SENHOR; * louvai o nome do SENHOR. Bendito seja o nome do SENHOR, * desde agora e para sempre. Do nascer ao pôr do sol, * seja louvado o nome do SENHOR. O SENHOR está acima de todas as nações, * e a sua glória, acima dos céus. Glória ao Pai... Amém.' },
      { id: 'fam-md-3', type: 'scripture', reference: 'João 15:4–5', text: 'Permanecei em mim, e eu permanecerei em vós. Assim como o ramo não pode dar fruto por si mesmo, se não permanecer na videira, assim também vós não podeis dar fruto, se não permanecerdes em mim. Eu sou a videira; vós sois os ramos.' },
      { id: 'fam-md-4', type: 'together', speaker: 'Pai-Nosso', text: 'Pai nosso, que estás nos céus... livra-nos do mal; pois teu é o Reino, o poder e a glória para sempre. Amém.' },
      { id: 'fam-md-5', type: 'collect', speaker: 'Coleta', text: 'Ó bendito Salvador, que nesta hora estiveste suspenso na Cruz, estendendo teus braços de amor: concede que todos os povos da terra olhem para ti e sejam salvos; por tuas ternas misericórdias. Amém.' }
    ]
  },
  {
    id: 'entardecer',
    name: 'Ao Entardecer',
    subtitle: 'Ofício Breve para Famílias e Indivíduos',
    items: [
      { id: 'fam-ent-1', type: 'scripture', reference: 'Salmo 36:7, 9', text: 'Como é precioso o teu amor, ó Deus! À sombra das tuas asas todos encontram refúgio. Pois em ti está a fonte da vida; na tua luz vemos a luz.' },
      { id: 'fam-ent-2', type: 'together', speaker: 'Phos hilaron (Luz Radiante)', text: 'Salve, alegre luz, puro esplendor da gloriosa face paternal. Salve, Jesus, bendito Salvador, Cristo ressuscitado e imortal. No horizonte o sol já declinou, brilham da noite as luzes cintilantes: ao Pai, ao Filho, ao Espírito de amor cantemos nossos hinos exultantes.' },
      { id: 'fam-ent-3', type: 'scripture', reference: '2 Coríntios 4:5–6', text: 'Não anunciamos a nós mesmos, mas a Jesus Cristo como Senhor; e nós somos vossos servos por amor de Jesus. Pois o Deus que disse: "Das trevas brilhe a luz" fez brilhar a sua luz em nosso coração.' },
      { id: 'fam-ent-4', type: 'together', speaker: 'Pai-Nosso', text: 'Pai nosso... Amém.' },
      { id: 'fam-ent-5', type: 'collect', speaker: 'Coleta', text: 'Ilumina, suplicamos-te, Senhor Deus, as nossas trevas; e misericordioso, defende-nos de todos os perigos e ciladas desta noite; por amor de teu único Filho, nosso Salvador Jesus Cristo. Amém.' }
    ]
  },
  {
    id: 'anoitecer',
    name: 'Ao Anoitecer',
    subtitle: 'Antes ou depois do jantar',
    items: [
      { id: 'fam-an-1', type: 'scripture', reference: 'Apocalipse 3:20', text: 'Eis que estou à porta e bato. Se alguém ouvir a minha voz e abrir a porta, entrarei e cearei com ele, e ele comigo.' },
      { id: 'fam-an-2', type: 'together', speaker: 'Oculi omnium (Salmo 145:15–18)', text: 'Os olhos de todos esperam em ti, * e a seu tempo tu lhes dás o alimento. Tu abres a tua mão * e sacias de bens tudo o que vive. O SENHOR é justo em todos os seus caminhos * e fiel em todas as suas obras. O SENHOR está perto de todos os que o invocam de coração sincero. Glória ao Pai... Amém.' },
      { id: 'fam-an-3', type: 'scripture', reference: 'Lucas 24:28–31', text: 'Ao chegarem perto do povoado para onde iam, Jesus fez como quem ia seguir adiante. Mas eles insistiram: "Fica conosco, porque já é tarde e o dia está terminando." E ele entrou para ficar com eles. Quando estava à mesa com eles, tomou o pão, deu graças, partiu-o e lhes deu. Então os olhos deles se abriram, e eles o reconheceram.' },
      { id: 'fam-an-4', type: 'together', speaker: 'Pai-Nosso', text: 'Pai nosso... Amém.' },
      { id: 'fam-an-5', type: 'collect', speaker: 'Coleta', text: 'Senhor Jesus, fica conosco, pois a tarde já cai e o dia chegou ao fim. Caminha conosco, aquece o nosso coração e desperta em nós a esperança, para que te reconheçamos nas Escrituras e no partir do pão. Concede-nos isto pelo teu amor. Amém.' }
    ]
  },
  {
    id: 'fim-do-dia',
    name: 'No Fim do Dia',
    subtitle: 'Oração antes de dormir',
    items: [
      { id: 'fam-fd-1', type: 'scripture', reference: 'Salmo 4:8', text: 'Em paz me deito e logo adormeço, pois só tu, SENHOR, me fazes viver em segurança.' },
      { id: 'fam-fd-2', type: 'together', speaker: 'Ecce nunc (Salmo 134)', text: 'Bendizei ao SENHOR, todos vós, servos do SENHOR, que permaneceis na casa do SENHOR durante a noite. Erguei as mãos para o santuário e bendizei ao SENHOR. De Sião te abençoe o SENHOR, que fez o céu e a terra. Glória ao Pai... Amém.' },
      { id: 'fam-fd-3', type: 'scripture', reference: 'Isaías 26:3–4', text: 'Tu conservas em perfeita paz quem tem o pensamento firme em ti, porque em ti confia. Confiai no SENHOR para sempre, porque o SENHOR Deus é uma rocha eterna.' },
      { id: 'fam-fd-4', type: 'together', speaker: 'Pai-Nosso', text: 'Pai nosso... Amém.' },
      { id: 'fam-fd-5', type: 'collect', speaker: 'Coleta', text: 'Visita este lugar, ó Senhor, e afasta para longe dele todas as ciladas do mal; habitem conosco os teus santos anjos, para nos guardarem em paz; e permaneça sempre sobre nós a tua bênção; por Jesus Cristo, nosso Senhor. Amém.' },
      { id: 'fam-fd-6', type: 'together', speaker: 'Nunc dimittis (Lucas 2:29–32)', text: 'Agora, Senhor, despedes em paz o teu servo, conforme a tua palavra; pois os meus olhos viram a tua salvação, que preparaste diante de todos os povos: luz que se revela às nações e glória do teu povo, Israel. Glória ao Pai... Amém.' },
      { id: 'fam-fd-7', type: 'leader', speaker: 'Bênção', text: 'O Senhor Todo-Poderoso e misericordioso, Pai, Filho e Espírito Santo, nos abençoe e nos guarde nesta noite e para sempre. Amém.' }
    ]
  }
];

export const WEEKLY_OFFICES: WeeklyOffice[] = [
  {
    dayOfWeek: 0,
    name: 'Domingo',
    theme: 'A Ressurreição',
    opening: 'Aleluia! Cristo ressuscitou.',
    openingResponse: 'Ressuscitou verdadeiramente. Aleluia!',
    prayer: 'Deus da vida, neste primeiro dia da semana nos alegramos: Cristo venceu a morte, e a pedra foi removida. Levanta-nos com ele. Que a alegria deste dia se estenda por toda a semana que começa. Que a tua Igreja, reunida em torno da Palavra e da Mesa, seja sinal da nova criação. Por Jesus Cristo, o Ressuscitado, que vive e reina contigo e com o Espírito Santo, agora e sempre. Amém.'
  },
  {
    dayOfWeek: 1,
    name: 'Segunda-feira',
    theme: 'A Criação e o Espírito',
    opening: 'Os céus proclamam a glória de Deus.',
    openingResponse: 'E o firmamento anuncia a obra das suas mãos.',
    openingRef: 'Salmo 19:1',
    prayer: 'Deus criador, que no princípio fizeste a luz e chamaste boa a tua obra: no começo desta semana, entrego a ti o meu trabalho e os meus dias. Que o teu Espírito, que pairava sobre as águas, paire também sobre o que é confuso e sem forma em mim, e faça disso algo bom. Ensina-me a cuidar da tua criação e a ver a tua mão em tudo o que eu encontrar hoje. Por Jesus Cristo, por meio de quem tudo foi feito. Amém.'
  },
  {
    dayOfWeek: 2,
    name: 'Terça-feira',
    theme: 'A Encarnação',
    opening: 'Eis que a virgem conceberá e dará à luz um filho.',
    openingResponse: 'E ele será chamado Emanuel: Deus conosco.',
    openingRef: 'Isaías 7:14',
    prayer: 'Senhor Jesus, que te fizeste carne e viveste anos escondidos em Nazaré, entre o trabalho, a mesa e a família: santifica o comum deste dia. Que eu te reconheça nas pessoas e nas pequenas tarefas. Que eu diga sim à tua palavra, como Maria disse. Habita em mim, para que a minha vida também mostre a tua graça e a tua verdade. Amém.'
  },
  {
    dayOfWeek: 3,
    name: 'Quarta-feira',
    theme: 'O Arrependimento',
    opening: 'Se observares, SENHOR, as nossas culpas, quem poderá resistir?',
    openingResponse: 'Mas em ti está o perdão.',
    openingRef: 'Salmo 130:3–4',
    prayer: 'Deus de misericórdia, no meio desta semana eu paro diante de ti. Tu conheces o que fiz e o que deixei de fazer, as palavras duras e o bem que adiei. Não me trates segundo as minhas culpas, mas segundo o teu amor. Dá-me um coração novo, humilde para pedir perdão e pronto para perdoar, e recomeça em mim a tua obra. Por Jesus Cristo, nosso Senhor. Amém.'
  },
  {
    dayOfWeek: 4,
    name: 'Quinta-feira',
    theme: 'A Ceia do Senhor',
    opening: 'Eu sou o pão da vida.',
    openingResponse: 'Quem vem a mim nunca terá fome.',
    openingRef: 'João 6:35',
    prayer: 'Senhor Jesus, que na noite em que foste traído partiste o pão com teus amigos e lavaste os seus pés: graças te dou por te dares a nós. Faze de mim alguém que serve, que se ajoelha diante do próximo e não se cansa de amar. E quando a noite do Getsêmani chegar para mim ou para quem eu amo, ensina-nos a orar contigo: seja feita a tua vontade. Amém.'
  },
  {
    dayOfWeek: 5,
    name: 'Sexta-feira',
    theme: 'A Cruz',
    opening: 'Nós te adoramos, ó Cristo, e te bendizemos.',
    openingResponse: 'Porque pela tua santa cruz redimiste o mundo.',
    prayer: 'Senhor Jesus Cristo, que estendeste os teus braços na cruz para abraçar o mundo inteiro: lembro hoje o preço do teu amor. Levo a ti as dores que carrego e as dores do mundo: quem sofre, quem está em solidão, quem clama e não ouve resposta. Une as nossas cruzes à tua, e faze delas caminho de vida e de paz. Amém.'
  },
  {
    dayOfWeek: 6,
    name: 'Sábado',
    theme: 'O Túmulo e o Descanso',
    opening: 'Venham a mim, todos vocês que estão cansados e sobrecarregados.',
    openingResponse: 'E eu lhes darei descanso.',
    openingRef: 'Mateus 11:28',
    prayer: 'Deus do descanso, que repousaste no sétimo dia e guardaste o corpo do teu Filho no silêncio do túmulo: ao fim desta semana, entrego a ti o que ficou por fazer. Ensina-me a parar, a confiar e a esperar, mesmo quando nada parece acontecer. Guarda também quem já descansa em ti, até o dia em que tudo será feito novo. Por Jesus Cristo, nosso Senhor. Amém.'
  }
];

export const ADDITIONAL_PRAYERS = [
  {
    title: 'Pelo espírito de oração',
    text: 'Ó Deus Todo-Poderoso, que derramas sobre todos os que o desejam o espírito de graça e de súplica: livra-nos, quando nos aproximamos de ti, da frieza do coração e da distração da mente, para que, com pensamentos firmes e afeições acesas, te adoremos em espírito e em verdade; por Jesus Cristo, nosso Senhor. Amém.'
  },
  {
    title: 'Pelos que amamos',
    text: 'Deus Todo-Poderoso, confiamos ao teu cuidado e ao teu amor, que nunca falham, todos os que nos são queridos, nesta vida e na vida que há de vir, sabendo que fazes por eles coisas melhores do que podemos desejar ou pedir; por Jesus Cristo, nosso Senhor. Amém.'
  },
  {
    title: 'Pela família',
    text: 'Misericordioso Salvador, que amaste Marta, Maria e Lázaro e santificaste o lar deles com a tua presença: abençoa o nosso lar, nós te pedimos, para que o teu amor repouse sobre nós e a tua presença habite conosco. Que todos nós cresçamos na graça e no conhecimento de ti, nosso Senhor e Salvador. Ensina-nos a amar uns aos outros, como nos ordenaste. Ajuda-nos a levar as cargas uns dos outros, cumprindo assim a tua lei, ó bendito Jesus, que com o Pai e o Espírito Santo vives e reinas, um só Deus, para todo o sempre. Amém.'
  },
  {
    title: 'Pelos parentes e amigos',
    text: 'Ó Pai amoroso, confiamos à tua bondosa guarda todos os que nos são próximos e queridos. Tem misericórdia dos que estão doentes e consola os que sofrem com dor, ansiedade ou tristeza. Desperta todos os que vivem descuidados das coisas eternas. Abençoa os jovens e os que têm saúde, para que te consagrem os dias da sua força. Conforta os idosos e os enfermos, para que a tua paz repouse sobre eles. Santifica os laços de família, para que ajudemos uns aos outros, e não nos atrapalhemos, em todas as boas obras que preparaste para que nelas andássemos; por Jesus Cristo, nosso Senhor. Amém.'
  },
  {
    title: 'Pelas crianças',
    text: 'Senhor Jesus Cristo, que tomaste as crianças nos braços e as abençoaste: abençoa as crianças desta família, para que cresçam no temor e no amor de Deus. Dá-lhes a tua força e a tua direção dia após dia, para que permaneçam no teu amor e no teu serviço até o fim da vida. Concede isto, ó bendito Salvador, por amor do teu nome. Amém.'
  },
  {
    title: 'Pela manhã',
    text: 'Ó Deus, Rei eterno, cuja luz separa o dia da noite e transforma a sombra da morte em manhã: afasta de nós todos os maus desejos, inclina o nosso coração a guardar a tua lei e guia os nossos pés no caminho da paz; para que, tendo feito com alegria a tua vontade durante o dia, possamos, ao chegar a noite, alegrar-nos em dar-te graças; por Jesus Cristo, nosso Senhor. Amém.'
  },
  {
    title: 'À noite',
    text: 'Ó Senhor, sustenta-nos durante todo o dia desta vida cheia de aflições, até que as sombras se alonguem, e chegue a tarde, e o mundo agitado silencie, e a febre da vida passe, e o nosso trabalho esteja terminado. Então, na tua misericórdia, concede-nos abrigo seguro, santo descanso e, por fim, a paz. Amém.'
  },
  {
    title: 'Por uma confiança serena',
    text: 'Ó Deus da paz, que nos ensinaste que na conversão e no descanso seremos salvos, e que na tranquilidade e na confiança estará a nossa força: pelo poder do teu Espírito, eleva-nos, nós te pedimos, à tua presença, onde possamos aquietar-nos e saber que tu és Deus; por Jesus Cristo, nosso Senhor. Amém.'
  },
  {
    title: 'Oração à refeição (1)',
    text: 'Os olhos de todos esperam em ti, ó Senhor, e tu lhes dás o alimento a seu tempo. Tu abres a tua mão e sacias de bens tudo o que vive. Abençoa-nos, Senhor, e a estes teus dons, que vamos receber da tua bondade; por Cristo, nosso Senhor. Amém.'
  },
  {
    title: 'Oração à refeição (2)',
    text: 'Abençoa, Senhor, estes alimentos para o nosso sustento, e a nós para o teu serviço, e faze-nos sempre atentos às necessidades dos outros; por Jesus Cristo, nosso Senhor. Amém.'
  }
];
