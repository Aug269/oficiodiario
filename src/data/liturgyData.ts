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
        text: 'Usamos a expressão “Quem oficia” para indicar a pessoa que está dirigindo a Oração, seja clérigo(a) ou leigo(a), exceto nos casos específicos com indicação de presbítero(a) ou bispo(a). As respostas do povo estão em negrito.'
      },
      {
        id: 'mat-heading-open',
        type: 'heading',
        text: 'Sentença de Abertura'
      },
      {
        id: 'mat-rubric-open',
        type: 'rubric',
        text: 'Quem oficia pode iniciar a Oração da Manhã lendo uma sentença de abertura das Escrituras. É costume utilizar uma das seguintes, ou uma das sentenças fornecidas ao final do Ofício.'
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
        id: 'mat-conf-rubric-1',
        type: 'rubric',
        text: 'Quem oficia diz:'
      },
      {
        id: 'mat-conf-exhortation',
        type: 'leader',
        speaker: 'Quem oficia',
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
        id: 'mat-abs-brief-rubric',
        type: 'rubric',
        text: 'ou:'
      },
      {
        id: 'mat-abs-brief',
        type: 'leader',
        speaker: 'Presbítero(a) ou Bispo(a)',
        text: 'O Senhor Todo-Poderoso e misericordioso vos conceda a absolvição e a remissão de todos os vossos pecados, o verdadeiro arrependimento, a emenda de vida, e a graça e a consolação do seu Espírito Santo. Amém.'
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
        id: 'mat-rubric-antifonas',
        type: 'rubric',
        text: 'Em seguida, diz-se o Venite. Alternativamente, pode-se usar o Jubilate.\nAntes e depois do Salmo Invitatório, pode-se cantar ou recitar uma destas antífonas ou uma das antífonas dos tempos litúrgicos:'
      },
      {
        id: 'mat-antifonas-ordinarias',
        type: 'together',
        speaker: 'Antífonas Gerais',
        text: `A terra pertence ao Senhor, pois ele a fez: *
Vinde, adoremos.

Adorai o Senhor no esplendor da santidade: *
Vinde, adoremos.

A misericórdia do Senhor dura para sempre: *
Vinde, adoremos.`
      },
      {
        id: 'mat-heading-venite',
        type: 'subheading',
        text: 'Venite, exultemus Domino'
      },
      {
        id: 'mat-venite-ref-rubric',
        type: 'rubric',
        text: '(Salmo 95:1–7; 96:9, 13)'
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
        id: 'mat-jubilate-rubric',
        type: 'rubric',
        text: 'ou:'
      },
      {
        id: 'mat-heading-jubilate',
        type: 'subheading',
        text: 'Jubilate Deo'
      },
      {
        id: 'mat-jubilate-ref-rubric',
        type: 'rubric',
        text: '(Salmo 100)'
      },
      {
        id: 'mat-jubilate-text',
        type: 'together',
        speaker: 'Todos',
        text: `Aclamai o SENHOR, *
habitantes de toda a terra!
Servi ao SENHOR com alegria; *
vinde à sua presença cantando.
Reconhecei que o SENHOR é Deus: ele nos fez, e a ele pertencemos; *
somos o seu povo, o rebanho que ele apascenta.
Entrai por suas portas dando graças, e em seus átrios, com louvor; *
dai-lhe graças e bendizei o seu nome.
Pois o SENHOR é bom, e a sua misericórdia dura para sempre; *
a sua fidelidade permanece de geração em geração.`
      },
      {
        id: 'mat-pascha-rubric',
        type: 'rubric',
        text: 'Na primeira semana da Páscoa, usa-se o Pascha nostrum, sem antífonas, em lugar do Salmo Invitatório; pode-se usá-lo também durante todo o Tempo Pascal:'
      },
      {
        id: 'mat-heading-pascha',
        type: 'subheading',
        text: 'Pascha nostrum'
      },
      {
        id: 'mat-pascha-text',
        type: 'together',
        speaker: 'Todos',
        text: `Aleluia. Cristo, nossa Páscoa, foi imolado por nós; *
celebremos, portanto, a festa,
não com o velho fermento, nem com o fermento da maldade e da perversidade, *
mas com os pães sem fermento da sinceridade e da verdade. Aleluia.
Cristo, ressuscitado dentre os mortos, já não morre; *
a morte já não tem domínio sobre ele.
Pois a morte que ele morreu, morreu para o pecado de uma vez por todas; *
mas a vida que vive, vive para Deus.
Assim também considerem-se mortos para o pecado, *
mas vivos para Deus em Jesus Cristo, nosso Senhor. Aleluia.
Cristo ressuscitou dentre os mortos, *
as primícias dos que adormeceram.
Pois, assim como por um homem veio a morte, *
também por um homem veio a ressurreição dos mortos.
Porque, assim como em Adão todos morrem, *
também em Cristo todos serão vivificados. Aleluia.`
      },
      {
        id: 'mat-pascha-ref-rubric',
        type: 'rubric',
        text: '1 Coríntios 5:7–8; Romanos 6:9–11; 1 Coríntios 15:20–22'
      },
      {
        id: 'mat-heading-psalms',
        type: 'heading',
        text: 'Salmos'
      },
      {
        id: 'mat-psalms-rubric',
        type: 'rubric',
        text: 'Dizem-se então um ou mais salmos, cada um com o Gloria Patri ao final.'
      },
      {
        id: 'mat-gloria-patri',
        type: 'together',
        speaker: 'Todos',
        text: `Glória ao Pai e ao Filho; *
e ao Espírito Santo;
como era no princípio, é agora e será sempre, *
por todos os séculos. Amém.`
      },
      {
        id: 'mat-heading-readings',
        type: 'heading',
        text: 'Leituras'
      },
      {
        id: 'mat-readings-rubric-1',
        type: 'rubric',
        text: 'Fazem-se uma ou mais leituras, conforme indicado. Cada leitura se anuncia assim:\n«Leitura do Livro de ____________.»\nPode-se acrescentar a referência do capítulo e dos versículos.'
      },
      {
        id: 'mat-readings-rubric-2',
        type: 'rubric',
        text: 'Ao final de cada leitura, quem lê pode dizer: «Palavra do Senhor.» Povo: «Demos graças a Deus.»'
      },
      {
        id: 'mat-readings-rubric-3',
        type: 'rubric',
        text: 'Quando a leitura é de um livro deuterocanônico, quem lê diz: «Aqui termina a leitura.»'
      },
      {
        id: 'mat-readings-rubric-4',
        type: 'rubric',
        text: 'Após cada leitura, diz-se ou canta-se um cântico. Quem oficia também pode usar um dos Cânticos Suplementares (páginas 59–69) ou outro cântico de louvor apropriado.'
      },
      {
        id: 'mat-heading-canticles',
        type: 'heading',
        text: 'Cânticos'
      },
      {
        id: 'mat-heading-benedictus-es',
        type: 'subheading',
        text: 'Benedictus es, Domine (Uma Canção de Louvor)'
      },
      {
        id: 'mat-benedictus-es-text',
        type: 'together',
        speaker: 'Todos',
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
        id: 'mat-benedictus-es-ref-rubric',
        type: 'rubric',
        text: 'Cântico dos Três Jovens, 29–34'
      },
      {
        id: 'mat-cantate-rubric',
        type: 'rubric',
        text: 'ou este:'
      },
      {
        id: 'mat-heading-cantate-domino',
        type: 'subheading',
        text: 'Cantate Domino (Salmo 98)'
      },
      {
        id: 'mat-cantate-domino-text',
        type: 'together',
        speaker: 'Todos',
        text: `Cantai ao SENHOR um cântico novo, pois ele fez maravilhas; *
a sua mão direita e o seu braço santo lhe deram a vitória.
O SENHOR deu a conhecer a sua salvação; *
revelou a sua justiça diante das nações.
Recordou o seu amor e a sua fidelidade à casa de Israel; *
os confins da terra contemplaram a salvação do nosso Deus.
Aclamai o SENHOR, toda a terra; *
alegrai-vos, exultai e cantai louvores.
Cantai louvores ao SENHOR com a harpa, *
com a harpa e ao som do canto;
com trombetas e ao som da trompa, *
aclamai diante do Rei, o SENHOR.
Estrondeie o mar e tudo o que nele existe, *
o mundo e os que nele habitam.
Batam palmas os rios, *
e os montes cantem juntos de alegria
diante do SENHOR, pois ele vem julgar a terra; *
julgará o mundo com justiça e os povos com retidão.`
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
        text: 'Orações'
      },
      {
        id: 'mat-prayers-rubric-1',
        type: 'rubric',
        text: 'Fazem-se então orações e súplicas:'
      },
      {
        id: 'mat-salutation-1',
        type: 'versicle',
        speaker: 'Quem oficia',
        text: 'O Senhor seja convosco.'
      },
      {
        id: 'mat-salutation-1-resp',
        type: 'people',
        speaker: 'Povo',
        text: 'E com teu espírito.'
      },
      {
        id: 'mat-salutation-alt-rubric',
        type: 'rubric',
        text: 'ou:'
      },
      {
        id: 'mat-salutation-2',
        type: 'versicle',
        speaker: 'Quem oficia',
        text: 'O Senhor está aqui.'
      },
      {
        id: 'mat-salutation-2-resp',
        type: 'people',
        speaker: 'Povo',
        text: 'O seu Espírito está conosco.'
      },
      {
        id: 'mat-oremos',
        type: 'versicle',
        speaker: 'Quem oficia',
        text: 'Oremos.'
      },
      {
        id: 'mat-kneel-rubric',
        type: 'rubric',
        text: 'O povo se ajoelha ou permanece de pé.'
      },
      {
        id: 'mat-kyrie-1',
        type: 'together',
        speaker: 'Todos',
        text: 'Senhor, tem misericórdia de nós.'
      },
      {
        id: 'mat-kyrie-2',
        type: 'together',
        speaker: 'Todos',
        text: 'Cristo, tem misericórdia de nós.'
      },
      {
        id: 'mat-kyrie-3',
        type: 'together',
        speaker: 'Todos',
        text: 'Senhor, tem misericórdia de nós.'
      },
      {
        id: 'mat-our-father-rubric',
        type: 'rubric',
        text: 'Todos oram:'
      },
      {
        id: 'mat-our-father',
        type: 'together',
        speaker: 'Todos',
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
        id: 'mat-suffrages-rubric',
        type: 'rubric',
        text: 'Pode-se então fazer a seguinte oração:'
      },
      {
        id: 'mat-suf-1-v',
        type: 'versicle',
        speaker: 'Quem oficia',
        text: 'Senhor, mostra-nos a tua misericórdia'
      },
      {
        id: 'mat-suf-1-r',
        type: 'people',
        speaker: 'Povo',
        text: 'e concede-nos a tua salvação.'
      },
      {
        id: 'mat-suf-2-v',
        type: 'versicle',
        speaker: 'Quem oficia',
        text: 'Reveste de santidade teus ministros e ministras,'
      },
      {
        id: 'mat-suf-2-r',
        type: 'people',
        speaker: 'Povo',
        text: 'e enche o teu povo de alegria.'
      },
      {
        id: 'mat-suf-3-v',
        type: 'versicle',
        speaker: 'Quem oficia',
        text: 'Dá a tua paz ao mundo'
      },
      {
        id: 'mat-suf-3-r',
        type: 'people',
        speaker: 'Povo',
        text: 'pois só em ti achamos segurança.'
      },
      {
        id: 'mat-suf-4-v',
        type: 'versicle',
        speaker: 'Quem oficia',
        text: 'Toma nossa nação sob teus cuidados;'
      },
      {
        id: 'mat-suf-4-r',
        type: 'people',
        speaker: 'Povo',
        text: 'guia-nos pelas veredas da justiça e da verdade.'
      },
      {
        id: 'mat-suf-5-v',
        type: 'versicle',
        speaker: 'Quem oficia',
        text: 'Sejam conhecidos na terra os teus propósitos'
      },
      {
        id: 'mat-suf-5-r',
        type: 'people',
        speaker: 'Povo',
        text: 'e entre as nações a tua salvação.'
      },
      {
        id: 'mat-suf-6-v',
        type: 'versicle',
        speaker: 'Quem oficia',
        text: 'Encontrem os necessitados socorro'
      },
      {
        id: 'mat-suf-6-r',
        type: 'people',
        speaker: 'Povo',
        text: 'e não esmoreça a esperança dos pobres.'
      },
      {
        id: 'mat-suf-7-v',
        type: 'versicle',
        speaker: 'Quem oficia',
        text: 'Purifica, ó Deus, os nossos corações'
      },
      {
        id: 'mat-suf-7-r',
        type: 'people',
        speaker: 'Povo',
        text: 'e fortalece-nos com o teu Santo Espírito.'
      },
      {
        id: 'mat-heading-collects',
        type: 'heading',
        text: 'Coleta do Dia'
      },
      {
        id: 'mat-collect-rubric-1',
        type: 'rubric',
        text: 'Quem oficia então ora uma ou mais das coletas seguintes, começando sempre pela Coleta do Dia (normalmente a Coleta do Domingo ou da Festa Principal, e dos dias da semana que se seguem, ou do Dia Santo que estiver sendo celebrado), encontrada nas páginas 103–136. É tradicional orar diariamente as Coletas pela Paz e pela Graça.'
      },
      {
        id: 'mat-heading-peace',
        type: 'subheading',
        text: 'Coleta pela Paz'
      },
      {
        id: 'mat-collect-peace',
        type: 'collect',
        speaker: 'Quem oficia',
        text: 'Ó Deus, autor da paz e amante da concórdia, conhecer-te é vida eterna, e servir-te é perfeita liberdade: defende-nos, teus humildes servos, para que, seguros por tua proteção, não temamos o poder das forças do mal; mediante Jesus Cristo, nosso Senhor. Amém.'
      },
      {
        id: 'mat-heading-grace',
        type: 'subheading',
        text: 'Coleta pela Graça'
      },
      {
        id: 'mat-collect-grace',
        type: 'collect',
        speaker: 'Quem oficia',
        text: 'Ó Senhor, nosso Pai celestial, Deus Todo-Poderoso e eterno, que nos conduziste em segurança até o começo deste dia: defende-nos hoje com teu grande poder e não permitas que caiamos em pecado nem que nos exponhamos, por descuido, a qualquer perigo. Concede que, guiados por tua providência, nossos pensamentos e ações sejam bons aos teus olhos; mediante Jesus Cristo, nosso Senhor. Amém.'
      },
      {
        id: 'mat-silence-requests-rubric',
        type: 'silence',
        text: 'Depois das coletas, pode-se guardar silêncio ou abrir espaço para pedidos pessoais.'
      },
      {
        id: 'mat-heading-thanksgiving',
        type: 'heading',
        text: 'Ação de Graças'
      },
      {
        id: 'mat-thanks-rubric',
        type: 'rubric',
        text: 'Todos oram:'
      },
      {
        id: 'mat-thanksgiving',
        type: 'together',
        speaker: 'Todos',
        text: `Onipotente Deus, Pai de toda a misericórdia, nós te rendemos os mais humildes e sinceros agradecimentos por toda a tua benevolência e carinhosa bondade para conosco e para com todas as pessoas.
Nós te bendizemos por nossa criação, preservação, e por todas as bênçãos desta vida: principalmente por teu inestimável amor na redenção do mundo por nosso Senhor Jesus Cristo, pelos meios de graça, e esperança da glória.
A ti rogamos nos concedas tal apreciação de tuas misericórdias, que nossos corações se encham de sincera gratidão e que proclamemos teus louvores não somente com os nossos lábios, mas com as nossas vidas, entregando-nos inteiramente ao teu serviço e andando perante ti em santidade e retidão todos os nossos dias.
Por Jesus Cristo nosso Senhor, a quem, contigo e o Espírito Santo, seja toda a honra e glória, por séculos sem fim. Amém.`
      },
      {
        id: 'mat-heading-chrysostom',
        type: 'subheading',
        text: 'Oração de São João Crisóstomo'
      },
      {
        id: 'mat-chrysostom',
        type: 'together',
        speaker: 'Todos',
        text: 'Deus Todo-Poderoso, que nos deste hoje a graça de te dirigirmos as nossas orações, prometendo que onde se congregassem dois ou três em teu nome atenderias as suas petições; cumpre agora, ó Senhor, os desejos e orações de teus servos e servas, segundo a estes mais convier, e concede-nos neste mundo conhecimento da tua verdade e, no vindouro, a vida eterna. Amém.'
      },
      {
        id: 'mat-heading-concluding',
        type: 'heading',
        text: 'Orações Conclusivas'
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
        text: 'Graças rendamos a Deus.'
      },
      {
        id: 'mat-easter-alleluia-rubric',
        type: 'rubric',
        text: 'Do Dia da Páscoa até o Dia de Pentecostes, pode-se acrescentar “Aleluia, aleluia” ao versículo e à resposta anteriores.'
      },
      {
        id: 'mat-concluding-sentence-rubric',
        type: 'rubric',
        text: 'Quem oficia diz uma das sentenças conclusivas seguintes; pode-se convidar o povo a dizê-la junto:'
      },
      {
        id: 'mat-benediction-1',
        type: 'together',
        speaker: '2 Coríntios 13:14',
        text: 'A graça de nosso Senhor Jesus Cristo, o amor de Deus e a comunhão do Espírito Santo sejam com todos nós para sempre. Amém.'
      },
      {
        id: 'mat-benediction-2-rubric',
        type: 'rubric',
        text: 'ou:'
      },
      {
        id: 'mat-benediction-2',
        type: 'together',
        speaker: 'Romanos 15:13',
        text: 'Que o Deus da esperança nos encha de toda alegria e paz na fé, pelo poder do Espírito Santo. Amém.'
      },
      {
        id: 'mat-benediction-3-rubric',
        type: 'rubric',
        text: 'ou:'
      },
      {
        id: 'mat-benediction-3',
        type: 'together',
        speaker: 'Efésios 3:20–21',
        text: 'Glória a Deus, cujo poder, agindo em nós, é capaz de fazer infinitamente mais do que tudo quanto podemos pedir ou imaginar. A ele seja a glória, de geração em geração, na Igreja e em Cristo Jesus, para todo o sempre. Amém.'
      },
      {
        id: 'mat-heading-seasonal-sentences',
        type: 'heading',
        text: 'Sentenças de Abertura Sazonais'
      },
      {
        id: 'mat-seasonal-rubric',
        type: 'rubric',
        text: 'Sentenças para o início do Ofício Matutino segundo o Tempo Litúrgico (páginas 29–31):'
      },
      {
        id: 'mat-season-advento',
        type: 'scripture',
        reference: 'Advento · Isaías 40:3',
        text: 'No deserto preparem o caminho para o SENHOR; façam no deserto um caminho reto para o nosso Deus.'
      },
      {
        id: 'mat-season-natal',
        type: 'scripture',
        reference: 'Natal · Lucas 2:10–11',
        text: 'Não tenham medo. Estou lhes trazendo boas novas de grande alegria, que são para todo o povo: hoje, na cidade de Davi, lhes nasceu o Salvador, que é Cristo, o Senhor.'
      },
      {
        id: 'mat-season-epifania',
        type: 'scripture',
        reference: 'Epifania · Malaquias 1:11',
        text: 'Do oriente ao ocidente grande é o meu nome entre as nações. Em toda parte incenso é oferecido ao meu nome, e ofertas puras, porque grande é o meu nome entre as nações, diz o SENHOR dos Exércitos.'
      },
      {
        id: 'mat-season-quaresma-1',
        type: 'scripture',
        reference: 'Quaresma · Mateus 3:2',
        text: 'Arrependam-se, pois o Reino dos céus está próximo.'
      },
      {
        id: 'mat-season-quaresma-2',
        type: 'scripture',
        reference: 'Quaresma · Salmo 51:9',
        text: 'Esconde o rosto dos meus pecados e apaga todas as minhas iniquidades.'
      },
      {
        id: 'mat-season-quaresma-3',
        type: 'scripture',
        reference: 'Quaresma · Marcos 8:34',
        text: 'Se alguém quiser acompanhar-me, negue-se a si mesmo, tome a sua cruz e siga-me.'
      },
      {
        id: 'mat-season-semana-santa',
        type: 'scripture',
        reference: 'Semana Santa · Lamentações 1:12',
        text: 'Vocês não se comovem, todos vocês que passam por aqui? Olhem ao redor e vejam se há sofrimento maior do que o que me foi imposto, que o SENHOR trouxe sobre mim no dia em que se acendeu a sua ira.'
      },
      {
        id: 'mat-season-pascoa',
        type: 'scripture',
        reference: 'Páscoa · Colossenses 3:1',
        text: 'Portanto, já que vocês ressuscitaram com Cristo, procurem as coisas que são do alto, onde Cristo está assentado à direita de Deus.'
      },
      {
        id: 'mat-season-ascensao',
        type: 'scripture',
        reference: 'Ascensão · Hebreus 4:14, 16',
        text: 'Visto que temos um grande sumo sacerdote que adentrou os céus, Jesus, o Filho de Deus, apeguemo-nos com toda a firmeza à fé que professamos. Assim, aproximemo-nos do trono da graça com toda a confiança, a fim de recebermos misericórdia e encontrarmos graça que nos ajude no momento da necessidade.'
      },
      {
        id: 'mat-season-pentecostes',
        type: 'scripture',
        reference: 'Pentecostes · Atos 1:8',
        text: 'Vocês receberão poder quando o Espírito Santo descer sobre vocês, e serão minhas testemunhas em Jerusalém, em toda a Judeia e Samaria, e até os confins da terra.'
      },
      {
        id: 'mat-season-trindade',
        type: 'scripture',
        reference: 'Santíssima Trindade · Apocalipse 4:8',
        text: 'Santo, santo, santo é o Senhor, o Deus Todo-Poderoso, que era, que é e que há de vir.'
      },
      {
        id: 'mat-season-acao-gracas',
        type: 'scripture',
        reference: 'Dias de Ação de Graças · Provérbios 3:9–10',
        text: 'Honre o SENHOR com todos os seus recursos e com os primeiros frutos de todas as suas plantações; os seus celeiros ficarão plenamente cheios, e os seus barris transbordarão de vinho.'
      },
      {
        id: 'mat-season-qualquer-tempo-1',
        type: 'scripture',
        reference: 'Em qualquer tempo · Habacuque 2:20',
        text: 'O SENHOR está em seu santo templo; diante dele fique em silêncio toda a terra.'
      },
      {
        id: 'mat-season-qualquer-tempo-2',
        type: 'scripture',
        reference: 'Em qualquer tempo · Salmo 43:3',
        text: 'Envia a tua luz e a tua verdade; elas me guiarão e me levarão ao teu santo monte, ao lugar onde habitas.'
      },
      {
        id: 'mat-season-qualquer-tempo-3',
        type: 'scripture',
        reference: 'Em qualquer tempo · Isaías 57:15',
        text: 'Assim diz o Alto, o Sublime, que vive para sempre, e cujo nome é santo: "Habito num lugar alto e santo, mas habito também com o contrito e humilde de espírito, para dar novo ânimo ao espírito do humilde e novo alento ao coração do contrito."'
      },
      {
        id: 'mat-season-qualquer-tempo-4',
        type: 'scripture',
        reference: 'Em qualquer tempo · João 4:23',
        text: 'Está chegando a hora, e de fato já chegou, em que os verdadeiros adoradores adorarão o Pai em espírito e em verdade. São estes os adoradores que o Pai procura.'
      },
      {
        id: 'mat-heading-seasonal-antiphons',
        type: 'heading',
        text: 'Antífonas Sazonais do Invitatório'
      },
      {
        id: 'mat-antiphons-rubric',
        type: 'rubric',
        text: 'Para serem cantadas ou recitadas antes e depois do Salmo Invitatório (páginas 31–32):'
      },
      {
        id: 'mat-ant-advento',
        type: 'together',
        speaker: 'Advento',
        text: 'Nosso Rei e Salvador se aproxima: * Vinde, adoremos.'
      },
      {
        id: 'mat-ant-natal',
        type: 'together',
        speaker: 'Natal',
        text: 'Aleluia. Um menino nos nasceu: * Vinde, adoremos. Aleluia.'
      },
      {
        id: 'mat-ant-epifania',
        type: 'together',
        speaker: 'Epifania e Transfiguração',
        text: 'O Senhor manifestou a sua glória: * Vinde, adoremos.'
      },
      {
        id: 'mat-ant-apresentacao',
        type: 'together',
        speaker: 'Apresentação e Anunciação',
        text: 'O Verbo se fez carne e habitou entre nós: * Vinde, adoremos.'
      },
      {
        id: 'mat-ant-quaresma',
        type: 'together',
        speaker: 'Quaresma',
        text: 'O Senhor é compassivo e misericordioso: * Vinde, adoremos.'
      },
      {
        id: 'mat-ant-pascoa-ascensao',
        type: 'together',
        speaker: 'Da Páscoa até a Ascensão',
        text: 'Aleluia. O Senhor ressuscitou verdadeiramente: * Vinde, adoremos. Aleluia.'
      },
      {
        id: 'mat-ant-ascensao-pentecostes',
        type: 'together',
        speaker: 'Da Ascensão até Pentecostes',
        text: 'Aleluia. Cristo, o Senhor, subiu aos céus: * Vinde, adoremos. Aleluia.'
      },
      {
        id: 'mat-ant-pentecostes',
        type: 'together',
        speaker: 'Dia de Pentecostes',
        text: 'Aleluia. O Espírito do Senhor renova a face da terra: * Vinde, adoremos. Aleluia.'
      },
      {
        id: 'mat-ant-trindade',
        type: 'together',
        speaker: 'Santíssima Trindade',
        text: 'Pai, Filho e Espírito Santo, um só Deus: * Vinde, adoremos.'
      },
      {
        id: 'mat-ant-todos-santos',
        type: 'together',
        speaker: 'Todos os Santos e Santas e outros Dias Santos',
        text: 'O Senhor é glorioso nos seus santos: * Vinde, adoremos.'
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
        id: 'mid-rubric-intro',
        type: 'rubric',
        text: 'Usamos a expressão “Quem oficia” para indicar a pessoa que está dirigindo a Oração, seja clérigo(a) ou leigo(a), exceto nos casos específicos com indicação de presbítero(a) ou bispo(a). As respostas do povo estão em negrito.'
      },
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
        text: 'Como era no princípio, é agora e será sempre, por todos os séculos. Amém.'
      },
      {
        id: 'mid-open-3',
        type: 'versicle',
        speaker: 'Quem oficia',
        text: '(Aleluia!)'
      },
      {
        id: 'mid-lent-rubric',
        type: 'rubric',
        text: 'Durante a Quaresma omite-se o Aleluia.'
      },
      {
        id: 'mid-heading-psalm',
        type: 'heading',
        text: 'Salmo'
      },
      {
        id: 'mid-psalm-rubric',
        type: 'rubric',
        text: 'Canta-se ou recita-se um ou mais dos salmos seguintes, ou outro salmo apropriado.'
      },
      {
        id: 'mid-heading-psalm-119',
        type: 'subheading',
        text: 'Lucerna pedibus meis (Salmo 119, XIV)'
      },
      {
        id: 'mid-psalm-119',
        type: 'together',
        speaker: 'Todos',
        text: `A tua palavra é lâmpada para os meus pés *
e luz para o meu caminho.
Fiz uma promessa e quero cumpri-la: *
seguir as tuas justas decisões.
Estou muito abatido; *
renova a minha vida, SENHOR, segundo a tua palavra.
Recebe, SENHOR, o louvor que te ofereço de coração *
e ensina-me a tua vontade.
Mesmo com a vida sempre em perigo, *
não me esqueço da tua lei.
Os maus preparam armadilhas para mim, *
mas eu não me afasto dos teus mandamentos.
Os teus ensinamentos são para sempre a minha herança; *
eles são a alegria do meu coração.
De todo o coração, quero seguir os teus caminhos, *
sempre, até o fim.
Glória ao Pai, ao Filho e ao Espírito Santo. *
Como era no princípio, é agora e será sempre, por todos os séculos. Amém.`
      },
      {
        id: 'mid-psalm-121-rubric',
        type: 'rubric',
        text: 'ou este:'
      },
      {
        id: 'mid-heading-psalm-121',
        type: 'subheading',
        text: 'Levavi oculos (Salmo 121)'
      },
      {
        id: 'mid-psalm-121',
        type: 'together',
        speaker: 'Todos',
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
        id: 'mid-psalm-126-rubric',
        type: 'rubric',
        text: 'ou este:'
      },
      {
        id: 'mid-heading-psalm-126',
        type: 'subheading',
        text: 'In convertendo (Salmo 126)'
      },
      {
        id: 'mid-psalm-126',
        type: 'together',
        speaker: 'Todos',
        text: `Quando o SENHOR mudou a sorte de Sião, *
parecia que sonhávamos.
Então a nossa boca se encheu de riso, e a nossa língua, de cantos de alegria; *
e entre as nações se dizia: O SENHOR fez grandes coisas por eles.
Sim, o SENHOR fez grandes coisas por nós, *
e por isso estamos alegres.
Muda a nossa sorte, SENHOR, *
como as torrentes que voltam ao Neguebe.
Os que semeiam com lágrimas *
colherão com cantos de alegria.
Quem sai chorando, levando a semente para semear, *
voltará com cantos de alegria, trazendo os seus feixes.
Glória ao Pai, ao Filho e ao Espírito Santo. *
Como era no princípio, é agora e será sempre, por todos os séculos. Amém.`
      },
      {
        id: 'mid-heading-reading',
        type: 'heading',
        text: 'Leitura'
      },
      {
        id: 'mid-reading-rubric',
        type: 'rubric',
        text: 'Lê-se então uma das passagens seguintes, ou outra passagem apropriada das Escrituras.'
      },
      {
        id: 'mid-reading-1',
        type: 'scripture',
        reference: 'João 12:31–32',
        text: 'Jesus disse: “Agora é o juízo deste mundo; agora será expulso o príncipe deste mundo. E eu, quando for levantado da terra, atrairei todos a mim.”'
      },
      {
        id: 'mid-reading-alt-rubric-1',
        type: 'rubric',
        text: 'ou:'
      },
      {
        id: 'mid-reading-2',
        type: 'scripture',
        reference: '2 Coríntios 5:17–18',
        text: 'Se alguém está em Cristo, é nova criação. As coisas antigas já passaram; eis que se fizeram novas. Tudo isso procede de Deus, que, por meio de Cristo, nos reconciliou consigo mesmo e nos confiou o ministério da reconciliação.'
      },
      {
        id: 'mid-reading-alt-rubric-2',
        type: 'rubric',
        text: 'ou:'
      },
      {
        id: 'mid-reading-3',
        type: 'scripture',
        reference: 'Malaquias 1:11',
        text: 'Do oriente ao ocidente grande é o meu nome entre as nações. Em toda parte incenso é oferecido ao meu nome, e ofertas puras, porque grande é o meu nome entre as nações, diz o SENHOR dos Exércitos.'
      },
      {
        id: 'mid-reading-post-rubric',
        type: 'rubric',
        text: 'Ao final da leitura, quem lê pode dizer: «Palavra do Senhor.» Povo: «Demos graças a Deus.»\nPode-se seguir uma meditação, em silêncio ou em voz alta.'
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
        id: 'mid-v-rubric',
        type: 'rubric',
        text: 'Fazem-se então orações e súplicas:'
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
        id: 'mid-kneel-rubric',
        type: 'rubric',
        text: 'Oremos. O povo se ajoelha ou permanece de pé.'
      },
      {
        id: 'mid-kyrie-1',
        type: 'together',
        speaker: 'Todos',
        text: 'Senhor, tem misericórdia de nós.'
      },
      {
        id: 'mid-kyrie-2',
        type: 'together',
        speaker: 'Todos',
        text: 'Cristo, tem misericórdia de nós.'
      },
      {
        id: 'mid-kyrie-3',
        type: 'together',
        speaker: 'Todos',
        text: 'Senhor, tem misericórdia de nós.'
      },
      {
        id: 'mid-our-father-rubric',
        type: 'rubric',
        text: 'Todos oram:'
      },
      {
        id: 'mid-our-father',
        type: 'together',
        speaker: 'Todos',
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
        id: 'mid-suffrage-rubric',
        type: 'rubric',
        text: 'Pode-se então fazer a seguinte oração:'
      },
      {
        id: 'mid-suffrage-v',
        type: 'versicle',
        speaker: 'Quem oficia',
        text: 'Senhor, escuta a nossa oração.'
      },
      {
        id: 'mid-suffrage-r',
        type: 'people',
        speaker: 'Povo',
        text: 'E chegue até ti o nosso clamor.'
      },
      {
        id: 'mid-heading-collect',
        type: 'heading',
        text: 'Coleta'
      },
      {
        id: 'mid-collect-rubric',
        type: 'rubric',
        text: 'Quem oficia pode então orar uma ou mais das coletas seguintes. Podem-se usar também outras coletas apropriadas.'
      },
      {
        id: 'mid-collect-1',
        type: 'collect',
        speaker: 'Quem oficia',
        text: 'Ó bendito Salvador, que nesta hora estiveste suspenso na Cruz, estendendo teus braços de amor: concede que todos os povos da terra olhem para ti e sejam salvos; por tuas ternas misericórdias. Amém.'
      },
      {
        id: 'mid-collect-2-rubric',
        type: 'rubric',
        text: 'ou:'
      },
      {
        id: 'mid-collect-2',
        type: 'collect',
        speaker: 'Quem oficia',
        text: 'Ó Salvador Todo-Poderoso, que ao meio-dia chamaste teu servo São Paulo para ser apóstolo aos gentios: nós te pedimos que ilumines o mundo com o esplendor da tua glória, para que todas as nações venham e te adorem; pois vives e reinas com o Pai e o Espírito Santo, um só Deus, pelos séculos dos séculos. Amém.'
      },
      {
        id: 'mid-collect-3-rubric',
        type: 'rubric',
        text: 'ou:'
      },
      {
        id: 'mid-collect-3',
        type: 'collect',
        speaker: 'Quem oficia',
        text: 'Pai de todas as misericórdias, revelaste tua compaixão sem limites ao teu apóstolo São Pedro em uma tríplice visão: perdoa, nós te pedimos, a nossa incredulidade; fortalece nossos corações e acende o nosso zelo, para que desejemos ardentemente a salvação de todos e trabalhemos com diligência pela expansão do teu Reino; por aquele que se entregou pela vida do mundo, teu Filho, Jesus Cristo, nosso Salvador. Amém.'
      },
      {
        id: 'mid-collect-4-rubric',
        type: 'rubric',
        text: 'ou:'
      },
      {
        id: 'mid-collect-4',
        type: 'collect',
        speaker: 'Quem oficia',
        text: 'Infunde, Senhor, a tua graça em nossos corações, para que nós, que conhecemos a encarnação de teu Filho Jesus Cristo, anunciada por um anjo à Virgem Maria, sejamos conduzidos, por sua Cruz e paixão, à glória da sua ressurreição; por Jesus Cristo, que vive e reina contigo, na unidade do Espírito Santo, um só Deus, agora e para sempre. Amém.'
      },
      {
        id: 'mid-collect-silence-rubric',
        type: 'rubric',
        text: 'Pode-se guardar silêncio e oferecer outras intercessões e ações de graças.'
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
        id: 'mid-easter-rubric',
        type: 'rubric',
        text: 'Do Dia da Páscoa até o Dia de Pentecostes, pode-se acrescentar “Aleluia, aleluia” ao versículo e à resposta anteriores.'
      },
      {
        id: 'mid-grace-rubric',
        type: 'rubric',
        text: 'Quem oficia pode concluir com a sentença seguinte, ou com uma das outras sentenças conclusivas da Oração da Manhã ou da Oração da Tarde:'
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
        id: 'vesp-rubric-intro',
        type: 'rubric',
        text: 'Usamos a expressão “Quem oficia” para indicar a pessoa que está dirigindo a Oração, seja clérigo(a) ou leigo(a), exceto nos casos específicos com indicação de presbítero(a) ou bispo(a). As respostas do povo estão em negrito.'
      },
      {
        id: 'vesp-heading-open',
        type: 'heading',
        text: 'Sentença de Abertura'
      },
      {
        id: 'vesp-rubric-open',
        type: 'rubric',
        text: 'Quem oficia pode iniciar a Oração da Tarde lendo uma sentença de abertura das Escrituras. É costume utilizar uma das seguintes, ou uma das sentenças fornecidas ao final do Ofício.'
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
        id: 'vesp-open-alt-rubric',
        type: 'rubric',
        text: 'ou:'
      },
      {
        id: 'vesp-open-alt',
        type: 'scripture',
        reference: 'Salmo 141:2',
        text: 'Que a minha oração seja posta diante de ti como incenso, e o levantar das minhas mãos como sacrifício da tarde.'
      },
      {
        id: 'vesp-heading-confession',
        type: 'heading',
        text: 'Confissão de Pecado'
      },
      {
        id: 'vesp-conf-exhortation-rubric',
        type: 'rubric',
        text: 'Quem oficia diz:'
      },
      {
        id: 'vesp-conf-exhortation',
        type: 'leader',
        speaker: 'Quem oficia',
        text: 'Amados irmãos, as Escrituras nos ensinam a reconhecermos e confessarmos nossos pecados e ofensas, e que não deveríamos escondê-los diante do nosso Pai Celestial, mas humildemente confessar, tendo um coração penitente e obediente a fim de que possamos obter perdão por sua imensa misericórdia e bondade. Devemos, em todo o tempo, humildemente reconhecer os nossos pecados diante do Senhor Todo-Poderoso, mas principalmente, quando nos congregamos e nos encontramos para a ação de graças pelos grandes benefícios que recebemos de suas mãos, para orar, ouvir sua santa palavra e aprender todas as coisas necessárias para nossa vida e salvação. Portanto, peço a vocês que me acompanhem, com puro coração e voz humilde, até o trono da graça, dizendo:'
      },
      {
        id: 'vesp-conf-brief-rubric',
        type: 'rubric',
        text: 'ou:'
      },
      {
        id: 'vesp-conf-brief',
        type: 'leader',
        speaker: 'Quem oficia',
        text: 'Confessemos humildemente os nossos pecados a Deus Todo-Poderoso.'
      },
      {
        id: 'vesp-silence-rubric',
        type: 'silence',
        text: 'Guarda-se silêncio por alguns instantes.'
      },
      {
        id: 'vesp-conf-kneel-rubric',
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
        text: 'Só presbítero(a) ou bispo(a) diz o que segue, de pé; o povo continua de joelhos.'
      },
      {
        id: 'vesp-abs-priest',
        type: 'leader',
        speaker: 'Presbítero(a) ou Bispo(a)',
        text: 'Deus Todo-Poderoso, Pai de nosso Senhor Jesus Cristo, que não deseja a morte do pecador, mas que ele se converta da sua maldade e viva, deu aos seus ministros poder e ordem para declarar e pronunciar ao seu povo arrependido a absolvição e a remissão dos seus pecados. Ele perdoa e absolve todos os que verdadeiramente se arrependem e creem sinceramente no seu santo Evangelho. Roguemos-lhe, pois, que nos conceda verdadeiro arrependimento e o seu Santo Espírito, a fim de que as obras que agora fazemos lhe sejam agradáveis; que a nossa vida, de hoje em diante, seja pura e santa; e que, finalmente, alcancemos a bem-aventurança eterna; por Jesus Cristo, nosso Senhor. Amém.'
      },
      {
        id: 'vesp-abs-brief-rubric',
        type: 'rubric',
        text: 'ou:'
      },
      {
        id: 'vesp-abs-brief',
        type: 'leader',
        speaker: 'Presbítero(a) ou Bispo(a)',
        text: 'O Senhor Todo-Poderoso e misericordioso vos conceda a absolvição e a remissão de todos os vossos pecados, o verdadeiro arrependimento, a emenda de vida, e a graça e a consolação do seu Espírito Santo. Amém.'
      },
      {
        id: 'vesp-abs-lay-rubric',
        type: 'rubric',
        text: 'Diácono(a) ou leigo(a) pode dizer, de joelhos:'
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
        text: 'Invitatório'
      },
      {
        id: 'vesp-inv-rubric',
        type: 'rubric',
        text: 'Todos de pé.'
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
        id: 'vesp-inv-2',
        type: 'versicle',
        speaker: 'Quem oficia',
        text: 'Glória ao Pai, ao Filho, e ao Espírito Santo.'
      },
      {
        id: 'vesp-inv-2-resp',
        type: 'people',
        speaker: 'Povo',
        text: 'Como era no princípio, é agora e será sempre, por todos os séculos. Amém.'
      },
      {
        id: 'vesp-inv-3',
        type: 'versicle',
        speaker: 'Quem oficia',
        text: 'Louvai ao Senhor.'
      },
      {
        id: 'vesp-inv-3-resp',
        type: 'people',
        speaker: 'Povo',
        text: 'O nome do Senhor seja louvado. (Aleluia!)'
      },
      {
        id: 'vesp-lent-rubric',
        type: 'rubric',
        text: 'Durante a Quaresma omite-se o Aleluia.'
      },
      {
        id: 'vesp-phos-rubric',
        type: 'rubric',
        text: 'Em seguida, diz-se o Phos hilaron. Alternativamente, pode-se usar o Ecce nunc.'
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
        id: 'vesp-ecce-nunc-rubric',
        type: 'rubric',
        text: 'ou este:'
      },
      {
        id: 'vesp-heading-ecce-nunc',
        type: 'subheading',
        text: 'Ecce nunc (Salmo 134)'
      },
      {
        id: 'vesp-ecce-nunc-text',
        type: 'together',
        speaker: 'Todos',
        text: `Bendizei ao SENHOR, todos vós, servos do SENHOR, *
que permaneceis na casa do SENHOR durante a noite.
Erguei as mãos para o santuário *
e bendizei ao SENHOR.
De Sião te abençoe o SENHOR, *
que fez o céu e a terra.`
      },
      {
        id: 'vesp-heading-psalms',
        type: 'heading',
        text: 'Salmos'
      },
      {
        id: 'vesp-psalms-rubric',
        type: 'rubric',
        text: 'Dizem-se então um ou mais salmos, cada um com o Gloria Patri ao final.'
      },
      {
        id: 'vesp-gloria',
        type: 'together',
        speaker: 'Todos',
        text: `Glória ao Pai e ao Filho; *
e ao Espírito Santo;
como era no princípio, é agora e será sempre, *
por todos os séculos. Amém.`
      },
      {
        id: 'vesp-heading-readings',
        type: 'heading',
        text: 'Leituras'
      },
      {
        id: 'vesp-readings-rubric',
        type: 'rubric',
        text: 'Fazem-se uma ou mais leituras, conforme indicado. Cada leitura se anuncia assim:\n«Leitura do Livro de ____________.»\nPode-se acrescentar a referência do capítulo e dos versículos.\nAo final de cada leitura, quem lê pode dizer: «Palavra do Senhor.» Povo: «Demos graças a Deus.»\nQuando a leitura é de um livro deuterocanônico, quem lê diz: «Aqui termina a leitura.»\nApós cada leitura, diz-se ou canta-se um cântico. Quem oficia também pode usar um dos Cânticos Suplementares (páginas 59–69) ou outro cântico de louvor apropriado.'
      },
      {
        id: 'vesp-heading-canticles',
        type: 'heading',
        text: 'Cânticos'
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
Glória ao Pai e ao Filho; *
e ao Espírito Santo;
como era no princípio, é agora e será sempre, *
por todos os séculos. Amém.`
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
        id: 'vesp-creed-rubric',
        type: 'rubric',
        text: 'Estando de pé, todos recitam:'
      },
      {
        id: 'vesp-creed-text',
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
        id: 'vesp-heading-prayers',
        type: 'heading',
        text: 'Orações'
      },
      {
        id: 'vesp-prayers-rubric-1',
        type: 'rubric',
        text: 'Fazem-se então orações e súplicas:'
      },
      {
        id: 'vesp-salutation-1',
        type: 'versicle',
        speaker: 'Quem oficia',
        text: 'O Senhor seja convosco.'
      },
      {
        id: 'vesp-salutation-1-resp',
        type: 'people',
        speaker: 'Povo',
        text: 'E com teu espírito.'
      },
      {
        id: 'vesp-salutation-alt-rubric',
        type: 'rubric',
        text: 'ou:'
      },
      {
        id: 'vesp-salutation-2',
        type: 'versicle',
        speaker: 'Quem oficia',
        text: 'O Senhor está aqui.'
      },
      {
        id: 'vesp-salutation-2-resp',
        type: 'people',
        speaker: 'Povo',
        text: 'O seu Espírito está conosco.'
      },
      {
        id: 'vesp-oremos',
        type: 'versicle',
        speaker: 'Quem oficia',
        text: 'Oremos.'
      },
      {
        id: 'vesp-kneel-rubric',
        type: 'rubric',
        text: 'O povo se ajoelha ou permanece de pé.'
      },
      {
        id: 'vesp-kyrie-1',
        type: 'together',
        speaker: 'Todos',
        text: 'Senhor, tem misericórdia de nós.'
      },
      {
        id: 'vesp-kyrie-2',
        type: 'together',
        speaker: 'Todos',
        text: 'Cristo, tem misericórdia de nós.'
      },
      {
        id: 'vesp-kyrie-3',
        type: 'together',
        speaker: 'Todos',
        text: 'Senhor, tem misericórdia de nós.'
      },
      {
        id: 'vesp-our-father-rubric',
        type: 'rubric',
        text: 'Todos oram:'
      },
      {
        id: 'vesp-our-father',
        type: 'together',
        speaker: 'Todos',
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
        id: 'vesp-suffrages-rubric-1',
        type: 'rubric',
        text: 'Pode-se então fazer a seguinte oração:'
      },
      {
        id: 'vesp-suf-1-v',
        type: 'versicle',
        speaker: 'Quem oficia',
        text: 'Senhor, mostra-nos a tua misericórdia'
      },
      {
        id: 'vesp-suf-1-r',
        type: 'people',
        speaker: 'Povo',
        text: 'e concede-nos a tua salvação.'
      },
      {
        id: 'vesp-suf-2-v',
        type: 'versicle',
        speaker: 'Quem oficia',
        text: 'Reveste de santidade teus ministros e ministras,'
      },
      {
        id: 'vesp-suf-2-r',
        type: 'people',
        speaker: 'Povo',
        text: 'e enche o teu povo de alegria.'
      },
      {
        id: 'vesp-suf-3-v',
        type: 'versicle',
        speaker: 'Quem oficia',
        text: 'Dá a tua paz ao mundo'
      },
      {
        id: 'vesp-suf-3-r',
        type: 'people',
        speaker: 'Povo',
        text: 'pois só em ti achamos segurança.'
      },
      {
        id: 'vesp-suf-4-v',
        type: 'versicle',
        speaker: 'Quem oficia',
        text: 'Toma nossa nação sob teus cuidados;'
      },
      {
        id: 'vesp-suf-4-r',
        type: 'people',
        speaker: 'Povo',
        text: 'guia-nos pelas veredas da justiça e da verdade.'
      },
      {
        id: 'vesp-suf-5-v',
        type: 'versicle',
        speaker: 'Quem oficia',
        text: 'Sejam conhecidos na terra os teus propósitos'
      },
      {
        id: 'vesp-suf-5-r',
        type: 'people',
        speaker: 'Povo',
        text: 'e entre as nações a tua salvação.'
      },
      {
        id: 'vesp-suf-6-v',
        type: 'versicle',
        speaker: 'Quem oficia',
        text: 'Encontrem os necessitados socorro'
      },
      {
        id: 'vesp-suf-6-r',
        type: 'people',
        speaker: 'Povo',
        text: 'e não esmoreça a esperança dos pobres.'
      },
      {
        id: 'vesp-suf-7-v',
        type: 'versicle',
        speaker: 'Quem oficia',
        text: 'Purifica, ó Deus, os nossos corações'
      },
      {
        id: 'vesp-suf-7-r',
        type: 'people',
        speaker: 'Povo',
        text: 'e fortalece-nos com o teu Santo Espírito.'
      },
      {
        id: 'vesp-suffrages-rubric-2',
        type: 'rubric',
        text: 'ou:'
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
Para que sejamos unidos pelo teu Santo Espírito na comunhão de [___________ e de] todos os teus santos, entregando-nos uns aos outros e toda a nossa vida a Cristo,
Nós te suplicamos, ó Senhor.`
      },
      {
        id: 'vesp-heading-collects',
        type: 'heading',
        text: 'Coleta do Dia'
      },
      {
        id: 'vesp-collect-rubric-1',
        type: 'rubric',
        text: 'Quem oficia então ora uma ou mais das coletas seguintes, começando sempre pela Coleta do Dia (normalmente a Coleta do Domingo ou da Festa Principal, e dos dias da semana que se seguem, ou do Dia Santo que estiver sendo celebrado), encontrada nas páginas 103–136. É tradicional orar diariamente as Coletas pela Paz e contra os perigos da noite.'
      },
      {
        id: 'vesp-heading-peace',
        type: 'subheading',
        text: 'Coleta pela Paz'
      },
      {
        id: 'vesp-collect-peace',
        type: 'collect',
        speaker: 'Quem oficia',
        text: 'Ó Deus, de quem procedem os desejos santos, os retos conselhos e os atos de justiça; concede a nós, teus servos, a paz que o mundo não nos pode dar, a fim de que nossos corações se dediquem a cumprir teus mandamentos, e, livres do temor de nossos inimigos, vivamos em paz e tranquilidade; pelos merecimentos de Jesus Cristo, nosso Senhor. Amém.'
      },
      {
        id: 'vesp-heading-night',
        type: 'subheading',
        text: 'Coleta contra os Perigos da Noite'
      },
      {
        id: 'vesp-collect-night',
        type: 'collect',
        speaker: 'Quem oficia',
        text: 'Ilumina, suplicamos-te, Senhor Deus, as nossas trevas; e misericordioso, defende-nos de todos os perigos e ciladas desta noite; por amor de teu único Filho, nosso Salvador Jesus Cristo. Amém.'
      },
      {
        id: 'vesp-silence-petitions-rubric',
        type: 'silence',
        text: 'Depois das coletas, pode-se guardar silêncio ou abrir espaço para pedidos pessoais.'
      },
      {
        id: 'vesp-heading-thanksgiving',
        type: 'heading',
        text: 'Ação de Graças'
      },
      {
        id: 'vesp-thanks-rubric',
        type: 'rubric',
        text: 'Todos oram:'
      },
      {
        id: 'vesp-thanksgiving',
        type: 'together',
        speaker: 'Todos',
        text: `Onipotente Deus, Pai de toda a misericórdia, nós te rendemos os mais humildes e sinceros agradecimentos por toda a tua benevolência e carinhosa bondade para conosco e para com todas as pessoas.
Nós te bendizemos por nossa criação, preservação, e por todas as bênçãos desta vida: principalmente por teu inestimável amor na redenção do mundo por nosso Senhor Jesus Cristo, pelos meios de graça, e esperança da glória.
A ti rogamos nos concedas tal apreciação de tuas misericórdias, que nossos corações se encham de sincera gratidão e que proclamemos teus louvores não somente com os nossos lábios, mas com as nossas vidas, entregando-nos inteiramente ao teu serviço e andando perante ti em santidade e retidão todos os nossos dias.
Por Jesus Cristo nosso Senhor, a quem, contigo e o Espírito Santo, seja toda a honra e glória, por séculos sem fim. Amém.`
      },
      {
        id: 'vesp-heading-chrysostom',
        type: 'subheading',
        text: 'Oração de São João Crisóstomo'
      },
      {
        id: 'vesp-chrysostom',
        type: 'together',
        speaker: 'Todos',
        text: 'Deus Todo-Poderoso, que nos deste hoje a graça de te dirigirmos as nossas orações, prometendo que onde se congregassem dois ou três em teu nome atenderias as suas petições; cumpre agora, ó Senhor, os desejos e orações de teus servos e servas, segundo a estes mais convier, e concede-nos neste mundo conhecimento da tua verdade e, no vindouro, a vida eterna. Amém.'
      },
      {
        id: 'vesp-heading-concluding',
        type: 'heading',
        text: 'Orações Conclusivas'
      },
      {
        id: 'vesp-closing',
        type: 'versicle',
        speaker: 'Quem oficia',
        text: 'Bendigamos ao SENHOR.'
      },
      {
        id: 'vesp-closing-resp',
        type: 'people',
        speaker: 'Povo',
        text: 'Graças rendamos a Deus.'
      },
      {
        id: 'vesp-easter-alleluia-rubric',
        type: 'rubric',
        text: 'Do Dia da Páscoa até o Dia de Pentecostes, pode-se acrescentar “Aleluia, aleluia” ao versículo e à resposta anteriores.'
      },
      {
        id: 'vesp-benediction-rubric',
        type: 'rubric',
        text: 'Quem oficia diz uma das sentenças conclusivas seguintes; pode-se convidar o povo a dizê-la junto:'
      },
      {
        id: 'vesp-benediction-1',
        type: 'together',
        speaker: '2 Coríntios 13:14',
        text: 'A graça de nosso Senhor Jesus Cristo, o amor de Deus e a comunhão do Espírito Santo sejam com todos nós para sempre. Amém.'
      },
      {
        id: 'vesp-benediction-2-rubric',
        type: 'rubric',
        text: 'ou:'
      },
      {
        id: 'vesp-benediction-2',
        type: 'together',
        speaker: 'Romanos 15:13',
        text: 'Que o Deus da esperança nos encha de toda alegria e paz na fé, pelo poder do Espírito Santo. Amém.'
      },
      {
        id: 'vesp-benediction-3-rubric',
        type: 'rubric',
        text: 'ou:'
      },
      {
        id: 'vesp-benediction-3',
        type: 'together',
        speaker: 'Efésios 3:20–21',
        text: 'Glória a Deus, cujo poder, agindo em nós, é capaz de fazer infinitamente mais do que tudo quanto podemos pedir ou imaginar. A ele seja a glória, de geração em geração, na Igreja e em Cristo Jesus, para todo o sempre. Amém.'
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
      { call: 'Ó Senhor, Soberano dos exércitos celestes, Deus de Abraão, de Isaque e de Jacó e de toda a sua justa descendência:', response: 'tu fizeste os céus e a terra, com tudo o que neles existe.' },
      { call: 'Todas as coisas estremecem diante de ti;', response: 'tremem por causa do teu poder.' },
      { call: 'Mas a tua promessa de misericórdia não tem medida;', response: 'ultrapassa tudo o que a nossa mente pode compreender.' },
      { call: 'Ó Senhor, tu és cheio de compaixão, paciente e rico em misericórdia.', response: 'Tu reténs a tua mão; não nos castigas como merecemos.' },
      { call: 'Em tua grande bondade, Senhor, prometeste perdão aos pecadores,', response: 'para que se arrependam do seu pecado e sejam salvos.' },
      { call: 'E agora, ó Senhor, dobro os joelhos do meu coração', response: 'e te suplico, confiante na tua bondade.' },
      { call: 'Pequei, ó Senhor, pequei, e conheço bem a minha maldade.', response: 'Por isso te faço esta oração: perdoa-me, Senhor, perdoa-me.' },
      { call: 'Não me deixes perecer no meu pecado,', response: 'nem me condenes às profundezas da terra.' },
      { call: 'Pois tu, Senhor, és o Deus dos que se arrependem,', response: 'e em mim mostrarás a tua bondade.' },
      { call: 'Indigno como sou, tu me salvarás, segundo a tua grande misericórdia,', response: 'e eu te louvarei sem cessar todos os dias da minha vida.' },
      { call: 'Pois todos os poderes do céu cantam os teus louvores,', response: 'e tua é a glória pelos séculos dos séculos. Amém.' }
    ]
  },
  {
    id: 'cantate-domino',
    latinTitle: 'Cantate Domino',
    portugueseTitle: 'Cantai ao Senhor',
    seasonRecommendation: 'Especialmente apropriado para o Tempo Pascal e para qualquer tempo fora dos tempos penitenciais.',
    reference: 'Salmo 98',
    verses: [
      { call: 'Cantai ao SENHOR um cântico novo, pois ele fez maravilhas;', response: 'a sua mão direita e o seu braço santo lhe deram a vitória.' },
      { call: 'O SENHOR deu a conhecer a sua salvação;', response: 'revelou a sua justiça diante das nações.' },
      { call: 'Recordou o seu amor e a sua fidelidade à casa de Israel;', response: 'os confins da terra contemplaram a salvação do nosso Deus.' },
      { call: 'Aclamai o SENHOR, toda a terra;', response: 'alegrai-vos, exultai e cantai louvores.' },
      { call: 'Cantai louvores ao SENHOR com a harpa,', response: 'com a harpa e ao som do canto;' },
      { call: 'com trombetas e ao som da trompa,', response: 'aclamai diante do Rei, o SENHOR.' },
      { call: 'Estrondeie o mar e tudo o que nele existe,', response: 'o mundo e os que nele habitam.' },
      { call: 'Batam palmas os rios, e os montes cantem juntos de alegria diante do SENHOR,', response: 'pois ele vem julgar a terra; julgará o mundo com justiça e os povos com retidão.' }
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
      { call: 'Glorificai o Senhor, anjos e todos os poderes do Senhor,', response: 'ó céus e todas as águas acima dos céus.' },
      { call: 'Sol, lua e estrelas do céu, glorificai o Senhor,', response: 'louvai-o e exaltai-o para sempre.' },
      { call: 'Glorificai o Senhor, chuvas e orvalhos,', response: 'todos os ventos, o fogo e o calor.' },
      { call: 'Inverno e verão, glorificai o Senhor,', response: 'louvai-o e exaltai-o para sempre.' },
      { call: 'Glorificai o Senhor, frio e geada,', response: 'gotas de orvalho e flocos de neve.' },
      { call: 'Gelo e granizo, glorificai o Senhor,', response: 'louvai-o e exaltai-o para sempre.' },
      { call: 'Glorificai o Senhor, noites e dias,', response: 'luz radiante e escuridão que envolve.' },
      { call: 'Nuvens de tempestade e relâmpagos, glorificai o Senhor,', response: 'louvai-o e exaltai-o para sempre.' },
      { call: 'Que a terra glorifique o Senhor,', response: 'louvai-o e exaltai-o para sempre.' },
      { call: 'Glorificai o Senhor, montes e colinas, e tudo o que cresce sobre a terra,', response: 'louvai-o e exaltai-o para sempre.' },
      { call: 'Glorificai o Senhor, fontes de água, mares e rios,', response: 'baleias e tudo o que se move nas águas.' },
      { call: 'Todas as aves do céu, glorificai o Senhor,', response: 'louvai-o e exaltai-o para sempre.' },
      { call: 'Glorificai o Senhor, animais selvagens,', response: 'e todos os rebanhos e manadas.' },
      { call: 'Homens e mulheres de toda parte, glorificai o Senhor,', response: 'louvai-o e exaltai-o para sempre.' },
      { call: 'Que o povo de Deus glorifique o Senhor,', response: 'louvai-o e exaltai-o para sempre.' },
      { call: 'Glorificai o Senhor, sacerdotes e servos do Senhor,', response: 'louvai-o e exaltai-o para sempre.' },
      { call: 'Glorificai o Senhor, espíritos e almas dos justos,', response: 'louvai-o e exaltai-o para sempre.' },
      { call: 'Vós que sois santos e humildes de coração, glorificai o Senhor,', response: 'louvai-o e exaltai-o para sempre.' },
      { call: 'Glorifiquemos o Senhor: Pai, Filho e Espírito Santo;', response: 'louvai-o e exaltai-o para sempre.' }
    ]
  }
];

export const FAMILY_OFFICES: FamilyOffice[] = [
  {
    id: 'manha',
    name: 'Pela Manhã',
    subtitle: 'Ofício para Famílias e Indivíduos',
    items: [
      {
        id: 'fam-m-rubric-open',
        type: 'rubric',
        text: 'Diz-se a seguinte sentença ou outro versículo das Escrituras.'
      },
      {
        id: 'fam-m-sentenca',
        type: 'scripture',
        reference: 'Salmo 51:15',
        text: 'Abre, ó Senhor, os meus lábios, e a minha boca proclamará o teu louvor.'
      },
      {
        id: 'fam-m-heading-salmo',
        type: 'subheading',
        text: 'Miserere mei, Deus (Salmo 51:10–12)'
      },
      {
        id: 'fam-m-salmo-text',
        type: 'together',
        speaker: 'Todos',
        text: `Cria em mim, ó Deus, um coração puro *
e renova dentro de mim um espírito reto.
Não me lances fora da tua presença, *
nem retires de mim o teu Santo Espírito.
Dá-me de novo a alegria da tua salvação *
e sustenta-me com um espírito disposto.
Glória ao Pai, ao Filho e ao Espírito Santo. *
Como era no princípio, é agora e será sempre, por todos os séculos. Amém.`
      },
      {
        id: 'fam-m-rubric-alt-psalm',
        type: 'rubric',
        text: 'Em lugar deste, pode-se dizer o Salmo 5:1–3 ou o salmo do dia.'
      },
      {
        id: 'fam-m-heading-leitura',
        type: 'heading',
        text: 'Leitura'
      },
      {
        id: 'fam-m-leitura-1',
        type: 'scripture',
        reference: '1 Pedro 1:3',
        text: 'Bendito seja o Deus e Pai de nosso Senhor Jesus Cristo! Em sua grande misericórdia, ele nos fez nascer de novo para uma esperança viva, pela ressurreição de Jesus Cristo dentre os mortos.'
      },
      {
        id: 'fam-m-rubric-ou-1',
        type: 'rubric',
        text: 'ou'
      },
      {
        id: 'fam-m-leitura-2',
        type: 'scripture',
        reference: 'Colossenses 1:12–14',
        text: 'Dai graças ao Pai, que vos tornou dignos de participar da herança dos santos na luz. Ele nos libertou do domínio das trevas e nos transferiu para o Reino do seu Filho amado, em quem temos a redenção, o perdão dos pecados.'
      },
      {
        id: 'fam-m-rubric-ou-2',
        type: 'rubric',
        text: 'ou'
      },
      {
        id: 'fam-m-leitura-3',
        type: 'scripture',
        reference: 'Colossenses 3:1–4',
        text: 'Já que fostes ressuscitados com Cristo, buscai as coisas do alto, onde Cristo está sentado à direita de Deus. Voltai o pensamento para as coisas do alto, e não para as da terra. Pois morrestes, e a vossa vida está escondida com Cristo em Deus. Quando Cristo, que é a vossa vida, for manifestado, então também vós sereis manifestados com ele em glória.'
      },
      {
        id: 'fam-m-rubric-silencio',
        type: 'silence',
        text: 'Pode-se guardar um momento de silêncio.'
      },
      {
        id: 'fam-m-rubric-credo',
        type: 'rubric',
        text: 'Pode-se cantar um hino ou cântico e dizer o Credo Apostólico (página 86).'
      },
      {
        id: 'fam-m-rubric-oracoes',
        type: 'rubric',
        text: 'Podem-se fazer orações por nós e pelos outros.'
      },
      {
        id: 'fam-m-heading-painosso',
        type: 'heading',
        text: 'Pai-Nosso'
      },
      {
        id: 'fam-m-painosso-text',
        type: 'together',
        speaker: 'Todos',
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
        id: 'fam-m-heading-coleta',
        type: 'heading',
        text: 'Coleta'
      },
      {
        id: 'fam-m-coleta-text',
        type: 'collect',
        speaker: 'Quem ora',
        text: 'Ó Senhor, nosso Pai celestial, Deus Todo-Poderoso e eterno, que nos conduziste em segurança até o começo deste dia: defende-nos hoje com teu grande poder e não permitas que caiamos em pecado nem que nos exponhamos, por descuido, a qualquer perigo. Concede que, guiados por tua providência, nossos pensamentos e ações sejam bons aos teus olhos; mediante Jesus Cristo, nosso Senhor. Amém.'
      }
    ]
  },
  {
    id: 'meio-dia',
    name: 'Ao Meio-Dia',
    subtitle: 'Ofício para Famílias e Indivíduos',
    items: [
      {
        id: 'fam-md-rubric-open',
        type: 'rubric',
        text: 'Diz-se a seguinte sentença ou outro versículo das Escrituras.'
      },
      {
        id: 'fam-md-sentenca',
        type: 'scripture',
        reference: 'Efésios 1:3',
        text: 'Bendito seja o Deus e Pai de nosso Senhor Jesus Cristo, que nos abençoou em Cristo com todas as bênçãos espirituais nos lugares celestiais.'
      },
      {
        id: 'fam-md-heading-salmo',
        type: 'subheading',
        text: 'Laudate, pueri (Salmo 113:1–4)'
      },
      {
        id: 'fam-md-salmo-text',
        type: 'together',
        speaker: 'Todos',
        text: `Louvai o SENHOR! Cantai louvores, servos do SENHOR; *
louvai o nome do SENHOR.
Bendito seja o nome do SENHOR, *
desde agora e para sempre.
Do nascer ao pôr do sol, *
seja louvado o nome do SENHOR.
O SENHOR está acima de todas as nações, *
e a sua glória, acima dos céus.
Glória ao Pai, ao Filho e ao Espírito Santo. *
Como era no princípio, é agora e será sempre, por todos os séculos. Amém.`
      },
      {
        id: 'fam-md-heading-leitura',
        type: 'heading',
        text: 'Leitura'
      },
      {
        id: 'fam-md-leitura-1',
        type: 'scripture',
        reference: 'João 15:4–5',
        text: 'Permanecei em mim, e eu permanecerei em vós. Assim como o ramo não pode dar fruto por si mesmo, se não permanecer na videira, assim também vós não podeis dar fruto, se não permanecerdes em mim. Eu sou a videira; vós sois os ramos. Quem permanece em mim, e eu nele, esse dá muito fruto; porque sem mim nada podeis fazer.'
      },
      {
        id: 'fam-md-rubric-ou',
        type: 'rubric',
        text: 'ou'
      },
      {
        id: 'fam-md-leitura-2',
        type: 'scripture',
        reference: 'Filipenses 4:6–7',
        text: 'Não vos inquieteis com nada; em tudo, pela oração e pela súplica, com ação de graças, apresentai a Deus os vossos pedidos. E a paz de Deus, que ultrapassa todo entendimento, guardará o vosso coração e os vossos pensamentos em Cristo Jesus.'
      },
      {
        id: 'fam-md-rubric-silencio',
        type: 'silence',
        text: 'Pode-se guardar um momento de silêncio.'
      },
      {
        id: 'fam-md-rubric-oracoes',
        type: 'rubric',
        text: 'Podem-se fazer orações por nós e pelos outros, e uma oração à mesa (página 90).'
      },
      {
        id: 'fam-md-heading-painosso',
        type: 'heading',
        text: 'Pai-Nosso'
      },
      {
        id: 'fam-md-painosso-text',
        type: 'together',
        speaker: 'Todos',
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
        id: 'fam-md-heading-coleta',
        type: 'heading',
        text: 'Coleta'
      },
      {
        id: 'fam-md-coleta-text',
        type: 'collect',
        speaker: 'Quem ora',
        text: 'Ó bendito Salvador, que nesta hora estiveste suspenso na Cruz, estendendo teus braços de amor: concede que todos os povos da terra olhem para ti e sejam salvos; por tuas ternas misericórdias. Amém.'
      }
    ]
  },
  {
    id: 'entardecer',
    name: 'Ao Entardecer',
    subtitle: 'Ofício para Famílias e Indivíduos',
    items: [
      {
        id: 'fam-ent-rubric-open',
        type: 'rubric',
        text: 'Diz-se a seguinte sentença ou outro versículo das Escrituras.'
      },
      {
        id: 'fam-ent-sentenca',
        type: 'scripture',
        reference: 'Salmo 36:7, 9',
        text: 'Como é precioso o teu amor, ó Deus! À sombra das tuas asas todos encontram refúgio. Pois em ti está a fonte da vida; na tua luz vemos a luz.'
      },
      {
        id: 'fam-ent-heading-hino',
        type: 'subheading',
        text: 'Phos hilaron (Luz Radiante)'
      },
      {
        id: 'fam-ent-phos-text',
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
        id: 'fam-ent-heading-leitura',
        type: 'heading',
        text: 'Leitura'
      },
      {
        id: 'fam-ent-leitura-1',
        type: 'scripture',
        reference: '2 Coríntios 4:5–6',
        text: 'Não anunciamos a nós mesmos, mas a Jesus Cristo como Senhor; e nós somos vossos servos por amor de Jesus. Pois o Deus que disse: "Das trevas brilhe a luz" fez brilhar a sua luz em nosso coração, para que conheçamos a glória de Deus na face de Cristo.'
      },
      {
        id: 'fam-ent-rubric-ou',
        type: 'rubric',
        text: 'ou'
      },
      {
        id: 'fam-ent-leitura-2',
        type: 'scripture',
        reference: 'João 8:12',
        text: 'Jesus lhes falou outra vez: "Eu sou a luz do mundo. Quem me segue nunca andará em trevas, mas terá a luz da vida."'
      },
      {
        id: 'fam-ent-rubric-silencio',
        type: 'silence',
        text: 'Pode-se guardar um momento de silêncio.'
      },
      {
        id: 'fam-ent-rubric-credo',
        type: 'rubric',
        text: 'Pode-se cantar um hino ou cântico e dizer o Credo Apostólico (página 86).'
      },
      {
        id: 'fam-ent-rubric-oracoes',
        type: 'rubric',
        text: 'Podem-se fazer orações por nós e pelos outros.'
      },
      {
        id: 'fam-ent-heading-painosso',
        type: 'heading',
        text: 'Pai-Nosso'
      },
      {
        id: 'fam-ent-painosso-text',
        type: 'together',
        speaker: 'Todos',
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
        id: 'fam-ent-heading-coleta',
        type: 'heading',
        text: 'Coleta'
      },
      {
        id: 'fam-ent-coleta-text',
        type: 'collect',
        speaker: 'Quem ora',
        text: 'Ilumina, suplicamos-te, Senhor Deus, as nossas trevas; e misericordioso, defende-nos de todos os perigos e ciladas desta noite; por amor de teu único Filho, nosso Salvador Jesus Cristo. Amém.'
      }
    ]
  },
  {
    id: 'anoitecer',
    name: 'Ao Anoitecer',
    subtitle: 'Antes ou depois do jantar',
    items: [
      {
        id: 'fam-an-rubric-open',
        type: 'rubric',
        text: 'Diz-se a seguinte sentença ou outro versículo das Escrituras.'
      },
      {
        id: 'fam-an-sentenca',
        type: 'scripture',
        reference: 'Apocalipse 3:20',
        text: 'Eis que estou à porta e bato. Se alguém ouvir a minha voz e abrir a porta, entrarei e cearei com ele, e ele comigo.'
      },
      {
        id: 'fam-an-heading-salmo',
        type: 'subheading',
        text: 'Oculi omnium (Salmo 145:15–18)'
      },
      {
        id: 'fam-an-salmo-text',
        type: 'together',
        speaker: 'Todos',
        text: `Os olhos de todos esperam em ti, *
e a seu tempo tu lhes dás o alimento.
Tu abres a tua mão *
e sacias de bens tudo o que vive.
O SENHOR é justo em todos os seus caminhos *
e fiel em todas as suas obras.
O SENHOR está perto de todos os que o invocam, *
de todos os que o invocam de coração sincero.
Glória ao Pai, ao Filho e ao Espírito Santo. *
Como era no princípio, é agora e será sempre, por todos os séculos. Amém.`
      },
      {
        id: 'fam-an-heading-leitura',
        type: 'heading',
        text: 'Leitura'
      },
      {
        id: 'fam-an-leitura-1',
        type: 'scripture',
        reference: 'Lucas 24:28–31',
        text: 'Ao chegarem perto do povoado para onde iam, Jesus fez como quem ia seguir adiante. Mas eles insistiram: "Fica conosco, porque já é tarde e o dia está terminando." E ele entrou para ficar com eles. Quando estava à mesa com eles, tomou o pão, deu graças, partiu-o e lhes deu. Então os olhos deles se abriram, e eles o reconheceram; mas ele desapareceu da presença deles.'
      },
      {
        id: 'fam-an-rubric-ou',
        type: 'rubric',
        text: 'ou'
      },
      {
        id: 'fam-an-leitura-2',
        type: 'scripture',
        reference: '1 João 4:7–11',
        text: 'Amados, amemos uns aos outros, porque o amor vem de Deus; quem ama nasceu de Deus e conhece a Deus. Quem não ama não conhece a Deus, pois Deus é amor. O amor de Deus se revelou a nós assim: Deus enviou ao mundo o seu Filho único, para que tenhamos vida por meio dele. O amor está nisto: não fomos nós que amamos a Deus, mas foi ele quem nos amou e enviou o seu Filho para expiar os nossos pecados. Amados, se Deus nos amou assim, também devemos amar uns aos outros.'
      },
      {
        id: 'fam-an-rubric-silencio',
        type: 'silence',
        text: 'Pode-se guardar um momento de silêncio.'
      },
      {
        id: 'fam-an-rubric-credo-advento',
        type: 'rubric',
        text: 'Pode-se cantar um hino ou cântico e dizer o Credo Apostólico (página 86). No Advento, de 17 a 23 de dezembro, a família pode cantar a estrofe do hino "Ó vem, ó vem, Emanuel" que corresponde à Antífona Ó do dia (páginas 409–410).'
      },
      {
        id: 'fam-an-rubric-oracoes-mesa',
        type: 'rubric',
        text: 'Podem-se fazer orações por nós e pelos outros, e uma oração à mesa (página 90).'
      },
      {
        id: 'fam-an-heading-painosso',
        type: 'heading',
        text: 'Pai-Nosso'
      },
      {
        id: 'fam-an-painosso-text',
        type: 'together',
        speaker: 'Todos',
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
        id: 'fam-an-heading-coleta',
        type: 'heading',
        text: 'Coleta'
      },
      {
        id: 'fam-an-coleta-text',
        type: 'collect',
        speaker: 'Quem ora',
        text: 'Senhor Jesus, fica conosco, pois a tarde já cai e o dia chegou ao fim. Caminha conosco, aquece o nosso coração e desperta em nós a esperança, para que te reconheçamos nas Escrituras e no partir do pão. Concede-nos isto pelo teu amor. Amém.'
      }
    ]
  },
  {
    id: 'fim-do-dia',
    name: 'No Fim do Dia',
    subtitle: 'Ofício para Famílias e Indivíduos',
    items: [
      {
        id: 'fam-fd-rubric-open',
        type: 'rubric',
        text: 'Diz-se a seguinte sentença ou outro versículo das Escrituras.'
      },
      {
        id: 'fam-fd-sentenca',
        type: 'scripture',
        reference: 'Salmo 4:8',
        text: 'Em paz me deito e logo adormeço, pois só tu, SENHOR, me fazes viver em segurança.'
      },
      {
        id: 'fam-fd-heading-salmo',
        type: 'subheading',
        text: 'Ecce nunc (Salmo 134)'
      },
      {
        id: 'fam-fd-salmo-text',
        type: 'together',
        speaker: 'Todos',
        text: `Bendizei ao SENHOR, todos vós, servos do SENHOR, *
que permaneceis na casa do SENHOR durante a noite.
Erguei as mãos para o santuário *
e bendizei ao SENHOR.
De Sião te abençoe o SENHOR, *
que fez o céu e a terra.
Glória ao Pai, ao Filho e ao Espírito Santo. *
Como era no princípio, é agora e será sempre, por todos os séculos. Amém.`
      },
      {
        id: 'fam-fd-heading-leitura',
        type: 'heading',
        text: 'Leitura'
      },
      {
        id: 'fam-fd-leitura-1',
        type: 'scripture',
        reference: 'Isaías 26:3–4',
        text: 'Tu conservas em perfeita paz quem tem o pensamento firme em ti, porque em ti confia. Confiai no SENHOR para sempre, porque o SENHOR Deus é uma rocha eterna.'
      },
      {
        id: 'fam-fd-rubric-ou',
        type: 'rubric',
        text: 'ou'
      },
      {
        id: 'fam-fd-leitura-2',
        type: 'scripture',
        reference: '1 Tessalonicenses 5:23',
        text: 'Que o próprio Deus da paz vos santifique inteiramente; e que todo o vosso espírito, alma e corpo sejam conservados irrepreensíveis para a vinda de nosso Senhor Jesus Cristo.'
      },
      {
        id: 'fam-fd-rubric-silencio',
        type: 'silence',
        text: 'Pode-se guardar um momento de silêncio.'
      },
      {
        id: 'fam-fd-rubric-canto',
        type: 'rubric',
        text: 'Pode-se cantar um hino ou cântico.'
      },
      {
        id: 'fam-fd-rubric-oracoes',
        type: 'rubric',
        text: 'Podem-se fazer orações por nós e pelos outros. Convém incluir ações de graças pelas bênçãos do dia e o arrependimento dos nossos pecados.'
      },
      {
        id: 'fam-fd-heading-painosso',
        type: 'heading',
        text: 'Pai-Nosso'
      },
      {
        id: 'fam-fd-painosso-text',
        type: 'together',
        speaker: 'Todos',
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
        id: 'fam-fd-heading-coleta',
        type: 'heading',
        text: 'Coleta'
      },
      {
        id: 'fam-fd-coleta-text',
        type: 'collect',
        speaker: 'Quem ora',
        text: 'Visita este lugar, ó Senhor, e afasta para longe dele todas as ciladas do mal; habitem conosco os teus santos anjos, para nos guardarem em paz; e permaneça sempre sobre nós a tua bênção; por Jesus Cristo, nosso Senhor. Amém.'
      },
      {
        id: 'fam-fd-heading-nunc',
        type: 'subheading',
        text: 'Nunc dimittis (Cântico de Simeão · Lucas 2:29–32)'
      },
      {
        id: 'fam-fd-nunc-text',
        type: 'together',
        speaker: 'Todos',
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
        id: 'fam-fd-heading-bencao',
        type: 'heading',
        text: 'Bênção'
      },
      {
        id: 'fam-fd-bencao-text',
        type: 'leader',
        speaker: 'Quem ora conclui:',
        text: 'O Senhor Todo-Poderoso e misericordioso, Pai, Filho e Espírito Santo, nos abençoe e nos guarde nesta noite e para sempre. Amém.'
      }
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
    page: 87,
    text: 'Ó Deus Todo-Poderoso, que derramas sobre todos os que o desejam o espírito de graça e de súplica: livra-nos, quando nos aproximamos de ti, da frieza do coração e da distração da mente, para que, com pensamentos firmes e afeições acesas, te adoremos em espírito e em verdade; por Jesus Cristo, nosso Senhor. Amém.'
  },
  {
    title: 'Pelos que amamos',
    page: 87,
    text: 'Deus Todo-Poderoso, confiamos ao teu cuidado e ao teu amor, que nunca falham, todos os que nos são queridos, nesta vida e na vida que há de vir, sabendo que fazes por eles coisas melhores do que podemos desejar ou pedir; por Jesus Cristo, nosso Senhor. Amém.'
  },
  {
    title: 'Pela família',
    page: 87,
    text: 'Misericordioso Salvador, que amaste Marta, Maria e Lázaro e santificaste o lar deles com a tua presença: abençoa o nosso lar, nós te pedimos, para que o teu amor repouse sobre nós e a tua presença habite conosco. Que todos nós cresçamos na graça e no conhecimento de ti, nosso Senhor e Salvador. Ensina-nos a amar uns aos outros, como nos ordenaste. Ajuda-nos a levar as cargas uns dos outros, cumprindo assim a tua lei, ó bendito Jesus, que com o Pai e o Espírito Santo vives e reinas, um só Deus, para todo o sempre. Amém.'
  },
  {
    title: 'Pelos parentes e amigos',
    page: 88,
    text: 'Ó Pai amoroso, confiamos à tua bondosa guarda todos os que nos são próximos e queridos. Tem misericórdia dos que estão doentes e consola os que sofrem com dor, ansiedade ou tristeza. Desperta todos os que vivem descuidados das coisas eternas. Abençoa os jovens e os que têm saúde, para que te consagrem os dias da sua força. Conforta os idosos e os enfermos, para que a tua paz repouse sobre eles. Santifica os laços de família, para que ajudemos uns aos outros, e não nos atrapalhemos, em todas as boas obras que preparaste para que nelas andássemos; por Jesus Cristo, nosso Senhor. Amém.'
  },
  {
    title: 'Pelas crianças',
    page: 88,
    text: 'Senhor Jesus Cristo, que tomaste as crianças nos braços e as abençoaste: abençoa as crianças desta família, para que cresçam no temor e no amor de Deus. Dá-lhes a tua força e a tua direção dia após dia, para que permaneçam no teu amor e no teu serviço até o fim da vida. Concede isto, ó bendito Salvador, por amor do teu nome. Amém.'
  },
  {
    title: 'Pela manhã',
    page: 88,
    text: 'Ó Deus, Rei eterno, cuja luz separa o dia da noite e transforma a sombra da morte em manhã: afasta de nós todos os maus desejos, inclina o nosso coração a guardar a tua lei e guia os nossos pés no caminho da paz; para que, tendo feito com alegria a tua vontade durante o dia, possamos, ao chegar a noite, alegrar-nos em dar-te graças; por Jesus Cristo, nosso Senhor. Amém.'
  },
  {
    title: 'À noite',
    page: 88,
    text: 'Ó Senhor, sustenta-nos durante todo o dia desta vida cheia de aflições, até que as sombras se alonguem, e chegue a tarde, e o mundo agitado silencie, e a febre da vida passe, e o nosso trabalho esteja terminado. Então, na tua misericórdia, concede-nos abrigo seguro, santo descanso e, por fim, a paz. Amém.'
  },
  {
    title: 'Por uma confiança serena',
    page: 89,
    text: 'Ó Deus da paz, que nos ensinaste que na conversão e no descanso seremos salvos, e que na tranquilidade e na confiança estará a nossa força: pelo poder do teu Espírito, eleva-nos, nós te pedimos, à tua presença, onde possamos aquietar-nos e saber que tu és Deus; por Jesus Cristo, nosso Senhor. Amém.'
  }
];

export interface MealPrayersData {
  title: string;
  page: number;
  versicle: {
    reference: string;
    text: string;
  };
  prayers: {
    id: string;
    label: string;
    text: string;
  }[];
}

export const MEAL_PRAYERS: MealPrayersData = {
  title: 'Orações às Refeições',
  page: 90,
  versicle: {
    reference: 'Salmo 145:15–16',
    text: `Os olhos de todos esperam em ti, ó Senhor, *
e tu lhes dás o alimento a seu tempo.
Tu abres a tua mão *
e sacias de bens tudo o que vive.`
  },
  prayers: [
    {
      id: 'refeicao-1',
      label: 'Primeira Oração',
      text: 'Abençoa-nos, Senhor, e a estes teus dons, que vamos receber da tua bondade; por Cristo, nosso Senhor. Amém.'
    },
    {
      id: 'refeicao-2',
      label: 'Segunda Oração (Alternativa)',
      text: 'Abençoa, Senhor, estes alimentos para o nosso sustento, e a nós para o teu serviço, e faze-nos sempre atentos às necessidades dos outros; por Jesus Cristo, nosso Senhor. Amém.'
    }
  ]
};

