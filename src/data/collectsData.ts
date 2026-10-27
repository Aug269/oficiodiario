export interface Collect {
  id: string;
  category: 'ano-cristao' | 'dias-santos' | 'comuns' | 'comemoracoes';
  season?: string;
  title: string;
  dateOrSunday?: string;
  prayer: string;
}

export const ALL_COLLECTS: Collect[] = [
  // ADVENTO
  {
    id: 'col-adv-1',
    category: 'ano-cristao',
    season: 'Advento',
    title: '1º Domingo do Advento',
    prayer: 'Deus Onipotente, dá-nos a graça de rejeitar as obras das trevas e vestir-nos das armas da luz, durante esta vida mortal, em que teu Filho Jesus Cristo, com grande humildade, veio visitar-nos; a fim de que, no último dia, quando ele vier em sua gloriosa majestade, para julgar os vivos e os mortos, ressuscitemos para a vida imortal, mediante Jesus Cristo, que vive e reina contigo e com o Espírito Santo, agora e sempre. Amém.'
  },
  {
    id: 'col-adv-2',
    category: 'ano-cristao',
    season: 'Advento',
    title: '2º Domingo do Advento',
    prayer: 'Deus Misericordioso, que enviaste teus mensageiros, os profetas, para pregar o arrependimento e preparar o caminho da nossa salvação; concede-nos a graça, para ouvirmos suas advertências e para abandonarmos os nossos pecados, a fim de saudarmos com alegria a vinda de Jesus Cristo, nosso Redentor, o qual vive e reina contigo e com o Espírito Santo, um só Deus, agora e sempre. Amém.'
  },
  {
    id: 'col-adv-3',
    category: 'ano-cristao',
    season: 'Advento',
    title: '3º Domingo do Advento',
    prayer: 'Senhor Jesus Cristo que, na tua primeira vinda, enviaste o precursor para preparar o teu caminho, concede à tua Igreja a graça e o poder para converter muitos ao caminho da justiça, a fim de que, na tua segunda vinda em glória, encontres um povo agradável aos teus olhos, ó tu, que vives e reinas com o Pai e o Espírito Santo, um só Deus, agora e sempre. Amém.'
  },
  {
    id: 'col-adv-4',
    category: 'ano-cristao',
    season: 'Advento',
    title: '4º Domingo do Advento',
    prayer: 'Ó Deus Onipotente, purifica a nossa consciência com tua visitação diária, para que o teu Filho Jesus Cristo, na sua vinda em glória, encontre em nós a morada preparada para si; o qual vive e reina contigo, na unidade do Espírito Santo, um só Deus, agora e sempre. Amém.'
  },

  // NATAL
  {
    id: 'col-nat-vigilia',
    category: 'ano-cristao',
    season: 'Natal',
    title: 'Vigília de Natal (24 de dezembro)',
    dateOrSunday: '24 de dezembro',
    prayer: 'Ó Deus, todos os anos nos alegras com a lembrança do nascimento de teu Filho; ajuda-nos a recebê-lo pela fé como nosso redentor, e dá-nos a graça de o contemplarmos sem temor no dia em que vier como nosso juiz. Mediante o mesmo Jesus Cristo, que vive e reina contigo e com o Espírito Santo, um só Deus, agora e sempre. Amém.'
  },
  {
    id: 'col-nat-dia',
    category: 'ano-cristao',
    season: 'Natal',
    title: 'Natividade de Nosso Senhor Jesus Cristo (25 de dezembro)',
    dateOrSunday: '25 de dezembro',
    prayer: 'Deus Onipotente, que nos deste teu unigênito Filho para que tomasse sobre si a nossa natureza, e nascesse neste tempo de uma Virgem pura; concede que nós, renascidos e feitos teus filhos por adoção e graça, sejamos de dia em dia renovados por teu Santo Espírito; mediante nosso Senhor Jesus Cristo, que vive e reina contigo e com o Espírito Santo, um só Deus, agora e sempre. Amém.'
  },
  {
    id: 'col-nat-1',
    category: 'ano-cristao',
    season: 'Natal',
    title: '1º Domingo depois do Natal',
    prayer: 'Onipotente Deus, que derramaste sobre nós a nova luz do teu Verbo feito carne; concede que essa mesma luz, acesa em nossos corações, brilhe em nossas vidas; por Jesus Cristo, nosso Senhor, que vive e reina contigo, na unidade do Espírito Santo, um só Deus, agora e sempre. Amém.'
  },
  {
    id: 'col-nat-2',
    category: 'ano-cristao',
    season: 'Natal',
    title: '2º Domingo depois do Natal',
    prayer: 'Ó Deus, que maravilhosamente criaste e ainda mais maravilhosamente restauraste a dignidade da natureza humana; concede que participemos da vida divinal de teu Filho Jesus Cristo, que se humilhou para participar de nossa humanidade, o qual vive e reina contigo e com o Espírito Santo, um só Deus, agora e sempre. Amém.'
  },

  // EPIFANIA
  {
    id: 'col-epif-dia',
    category: 'ano-cristao',
    season: 'Epifania',
    title: 'Epifania de Nosso Senhor Jesus Cristo (6 de janeiro)',
    dateOrSunday: '6 de janeiro',
    prayer: 'Ó Deus, que pela Estrela manifestaste teu unigênito Filho a todos os povos da terra; guia-nos à tua presença, os que hoje te conhecemos pela fé; a fim de que desfrutemos de tua glória face a face; mediante Jesus Cristo, nosso Senhor, que vive e reina contigo e com o Espírito Santo, um só Deus, agora e sempre. Amém.'
  },
  {
    id: 'col-epif-batismo',
    category: 'ano-cristao',
    season: 'Epifania',
    title: 'Batismo de Nosso Senhor Jesus Cristo',
    dateOrSunday: '1º Domingo depois da Epifania',
    prayer: 'Ó Pai Celestial, que, no Batismo de Jesus, no Jordão, o proclamaste teu amado Filho e o ungiste com o Espírito Santo; concede que todos os batizados em seu nome guardem constantes a aliança que estabeleceste e, com ousadia, o confessem Senhor e Salvador, o qual vive e reina contigo e com o Espírito Santo, um só Deus, agora e sempre. Amém.'
  },
  {
    id: 'col-epif-2',
    category: 'ano-cristao',
    season: 'Epifania',
    title: '2º Domingo depois da Epifania',
    prayer: 'Deus Onipotente, cujo Filho, nosso Salvador Jesus Cristo, é a luz do mundo; concede que o teu povo, iluminado e fortalecido pela tua Palavra e Sacramentos, brilhe com o resplendor da glória de Cristo, para que ele seja conhecido, adorado e obedecido até os confins da terra; mediante Jesus Cristo, nosso Senhor, que vive e reina contigo e com o Espírito Santo, um só Deus, agora e sempre. Amém.'
  },
  {
    id: 'col-epif-3',
    category: 'ano-cristao',
    season: 'Epifania',
    title: '3º Domingo depois da Epifania',
    prayer: 'Concede-nos a graça, ó Senhor, para responder prontamente ao chamado de nosso Senhor Jesus Cristo e proclamar a todos os povos as Boas Novas da sua salvação, para que nós e o mundo todo contemplemos a glória das suas maravilhosas obras; o qual vive e reina contigo e com o Espírito Santo, um só Deus, agora e sempre. Amém.'
  },
  {
    id: 'col-epif-4',
    category: 'ano-cristao',
    season: 'Epifania',
    title: '4º Domingo depois da Epifania',
    prayer: 'Onipotente e sempiterno Deus que governas todas as coisas no céu e na terra; ouve, misericordioso, as súplicas de teu povo, e concede-nos tua paz todos os dias de nossa vida; mediante Jesus Cristo, nosso Senhor. Amém.'
  },
  {
    id: 'col-epif-5',
    category: 'ano-cristao',
    season: 'Epifania',
    title: '5º Domingo depois da Epifania',
    prayer: 'Liberta-nos, ó Deus, da escravidão de nossos pecados e concede-nos a liberdade daquela vida abundante que nos fizeste conhecer em teu Filho Jesus Cristo, nosso Salvador, o qual vive e reina contigo e com o Espírito Santo, um só Deus, agora e sempre. Amém.'
  },
  {
    id: 'col-epif-6',
    category: 'ano-cristao',
    season: 'Epifania',
    title: '6º Domingo depois da Epifania',
    prayer: 'Ó Deus, fortaleza dos que em ti confiam; misericordioso aceita nossas orações; e porquanto sem ti nada pode a fraqueza humana, concede-nos o auxílio de tua graça, para que, na prática de teus preceitos, te agrademos com a vontade e com as obras; mediante Jesus Cristo, nosso Senhor. Amém.'
  },
  {
    id: 'col-epif-7',
    category: 'ano-cristao',
    season: 'Epifania',
    title: '7º Domingo depois da Epifania',
    prayer: 'Ó Senhor, que nos ensinaste que todas as nossas ações sem amor, de nada valem; envia-nos o teu Santo Espírito e derrama em nossos corações o excelente dom da caridade, que é o verdadeiro vínculo da paz e de todas as virtudes, pois os que sem ela vivem, são considerados mortos aos teus olhos; concede-nos essa graça, mediante o teu único Filho Jesus Cristo, nosso Senhor, que vive e reina contigo e com o Espírito Santo, um só Deus, agora e sempre. Amém.'
  },
  {
    id: 'col-epif-8',
    category: 'ano-cristao',
    season: 'Epifania',
    title: '8º Domingo depois da Epifania',
    prayer: 'Ó Amorosíssimo Pai, que desejas nos mostremos agradecidos e lancemos os nossos cuidados sobre ti, que zelas por nós, nada temendo senão a perda de tua presença; preserva-nos de infundados receios e ansiedades mundanas, e não permitas que nuvem alguma da vida terrenal esconda de nós a luz de teu eterno amor, que a nós manifestaste na pessoa de teu Filho Jesus Cristo, nosso Senhor. Amém.'
  },
  {
    id: 'col-epif-transfig',
    category: 'ano-cristao',
    season: 'Epifania',
    title: 'Último Domingo depois da Epifania (Transfiguração)',
    prayer: 'Ó Deus, que, antes da Paixão de teu unigênito Filho, revelaste a sua glória sobre o monte, na Transfiguração; concede que nós, contemplando pela fé o resplendor de sua face, sejamos fortalecidos para carregar a nossa cruz e transformados na sua semelhança de glória em glória; por Jesus Cristo, nosso Senhor, que vive e reina contigo e com o Espírito Santo, um só Deus, agora e sempre. Amém.'
  },

  // QUARESMA
  {
    id: 'col-quar-cinzas',
    category: 'ano-cristao',
    season: 'Quaresma',
    title: 'Quarta-feira de Cinzas',
    prayer: 'Onipotente e Eterno Deus, que amas tudo quanto criaste, e que perdoas a todos os penitentes; cria em nós corações novos e contritos, para que, lamentando deveras os nossos pecados e confessando a nossa miséria, alcancemos de ti, Deus de suma piedade, perfeita remissão e perdão; por nosso Senhor Jesus Cristo, que vive e reina contigo e com o Espírito Santo, um só Deus, agora e sempre. Amém.'
  },
  {
    id: 'col-quar-1',
    category: 'ano-cristao',
    season: 'Quaresma',
    title: '1º Domingo na Quaresma',
    prayer: 'Onipotente Deus, cujo bendito Filho foi conduzido pelo Espírito para ser tentado pelo demônio, apressa-te em socorrer a nós, que somos assaltados por muitas tentações, nós te rogamos. E, assim como conheces as fraquezas de cada um de nós, permite que cada qual encontre em ti o poder de salvação. Por Jesus Cristo teu Filho, nosso Senhor, que vive e reina contigo e com o Espírito Santo, um só Deus, agora e sempre. Amém.'
  },
  {
    id: 'col-quar-2',
    category: 'ano-cristao',
    season: 'Quaresma',
    title: '2º Domingo na Quaresma',
    prayer: 'Ó Deus, cuja glória é sempre ser misericordioso, sê benigno para com todos os que se afastaram dos teus caminhos, conduze-os de novo a ti, com corações penitentes e viva fé, para que se firmem na verdade imutável da tua Palavra, Jesus Cristo, teu Filho, que, contigo e com o Espírito Santo, vive e reina, um só Deus, agora e sempre. Amém.'
  },
  {
    id: 'col-quar-3',
    category: 'ano-cristao',
    season: 'Quaresma',
    title: '3º Domingo na Quaresma',
    prayer: 'Ó Deus, que sabes quão frágeis somos, guarda-nos a nós, teus servos, defendendo exteriormente nossos corpos de toda a adversidade e purificando interiormente nossas almas de todo mau pensamento; por Jesus Cristo, nosso Senhor, que vive e reina contigo e com o Espírito Santo, um só Deus, agora e sempre. Amém.'
  },
  {
    id: 'col-quar-4',
    category: 'ano-cristao',
    season: 'Quaresma',
    title: '4º Domingo na Quaresma',
    prayer: 'Bendito Pai, cujo Filho Jesus Cristo desceu do céu para ser o verdadeiro Pão que vivifica o mundo; concede-nos sempre esse Pão, para que ele viva em nós e nós nele, que vive e reina contigo e com o Espírito Santo, um só Deus, agora e sempre. Amém.'
  },
  {
    id: 'col-quar-5',
    category: 'ano-cristao',
    season: 'Quaresma',
    title: '5º Domingo na Quaresma',
    prayer: 'Onipotente Deus, tu somente podes colocar em ordem a vontade e as afeições desordenadas dos pecadores. Concede ao teu povo a graça de amar o que ordenas e desejar o que prometes; para que, entre as inconstâncias do mundo, permaneçam nossos corações firmados lá onde se acha a verdadeira alegria, por nosso Senhor Jesus Cristo, que vive e reina contigo e com o Espírito Santo, um só Deus, agora e sempre. Amém.'
  },

  // SEMANA SANTA
  {
    id: 'col-sem-ramos',
    category: 'ano-cristao',
    season: 'Semana Santa',
    title: 'Domingo de Ramos',
    prayer: 'Onipotente e Eterno Deus, de tal modo amaste o mundo, que enviaste teu Filho, nosso Salvador Jesus Cristo, para tomar sobre si a nossa carne e sofrer morte na cruz, dando ao gênero humano exemplo de sua profunda humildade; concede, em tua misericórdia, que imitemos a sua paciência no sofrimento e possamos participar também de sua ressurreição; mediante o mesmo Jesus Cristo, nosso Senhor, que vive e reina contigo e com o Espírito Santo, um só Deus, agora e sempre. Amém.'
  },
  {
    id: 'col-sem-quinta',
    category: 'ano-cristao',
    season: 'Semana Santa',
    title: 'Quinta-feira Santa',
    prayer: 'Pai Onipotente, teu Filho, Jesus Cristo, ensinou-nos que o que fizermos pelo menor dos nossos irmãos é por ele que o fazemos; dá-nos a vontade de ser servos uns dos outros, tal como ele foi servo de todos; o qual deu a sua vida e morreu por nós, mas vive e reina contigo e com o Espírito Santo, um só Deus, agora e para sempre. Amém.'
  },
  {
    id: 'col-sem-sexta',
    category: 'ano-cristao',
    season: 'Semana Santa',
    title: 'Sexta-feira Santa',
    prayer: 'Deus Onipotente, nós te suplicamos olhes com misericórdia para esta família que é tua, e pela qual nosso Senhor Jesus Cristo não hesitou em entregar-se, traído, às mãos de homens iníquos, e sofrer morte de cruz; o qual vive e reina contigo e com o Espírito Santo, um só Deus, agora e sempre. Amém.'
  },
  {
    id: 'col-sem-sabado',
    category: 'ano-cristao',
    season: 'Semana Santa',
    title: 'Sábado Santo',
    prayer: 'Ó Deus, Criador do céu e da terra; concede que, assim como o corpo crucificado de teu amado Filho foi colocado no túmulo e descansou neste sábado santo, também sepultados com ele aguardemos o terceiro dia e com ele ressuscitemos para uma vida nova; o qual vive e reina contigo e com o Espírito Santo, um só Deus, agora e sempre. Amém.'
  },

  // TEMPO PASCAL
  {
    id: 'col-pasc-dia',
    category: 'ano-cristao',
    season: 'Tempo Pascal',
    title: 'Dia de Páscoa (Domingo da Ressurreição)',
    prayer: 'Senhor Deus, tu fizeste resplandecer esta noite com a glória da ressurreição de Cristo; faz com que a sua luz brilhe na tua Igreja para que sejamos renovados no corpo e na alma e nos entreguemos plenamente ao teu serviço. Mediante Jesus Cristo, teu Filho, nosso Senhor, que vive e reina contigo e com o Espírito Santo, um só Deus, agora e sempre. Amém.'
  },
  {
    id: 'col-pasc-2',
    category: 'ano-cristao',
    season: 'Tempo Pascal',
    title: '2º Domingo da Páscoa',
    prayer: 'Pai celestial, libertaste-nos do poder do pecado e trouxeste-nos para o reino de teu Filho; concede que Aquele cuja morte nos restaurou à vida, pela sua presença entre nós, nos erga até às alegrias eternas. Mediante Jesus Cristo, nosso Senhor. Amém.'
  },
  {
    id: 'col-pasc-3',
    category: 'ano-cristao',
    season: 'Tempo Pascal',
    title: '3º Domingo da Páscoa',
    prayer: 'Deus Todo-Poderoso, tu mostras a luz da verdade aos que erram para que regressem ao caminho da retidão; ajuda os que são de Cristo a renunciar a tudo que se oponha à fé que professam e a andar nos passos do divino Mestre. Mediante Jesus Cristo, nosso Senhor. Amém.'
  },
  {
    id: 'col-pasc-4',
    category: 'ano-cristao',
    season: 'Tempo Pascal',
    title: '4º Domingo da Páscoa (Bom Pastor)',
    prayer: 'Ó Deus, cujo Filho Jesus é o Bom Pastor do teu povo; concede que, quando ouvirmos sua voz, reconheçamos Aquele que nos chama cada um pelo nome e o sigamos para onde nos conduz; o qual vive e reina contigo e com o Espírito Santo, um só Deus, agora e sempre. Amém.'
  },
  {
    id: 'col-pasc-5',
    category: 'ano-cristao',
    season: 'Tempo Pascal',
    title: '5º Domingo da Páscoa',
    prayer: 'Ó Deus Onipotente, a quem verdadeiramente conhecer é a vida eterna; concede-nos que conheçamos perfeitamente que teu Filho Jesus Cristo é o caminho, a verdade e a vida; para que, seguindo seus passos, andemos com perseverança no caminho que conduz à vida eterna; mediante o mesmo teu Filho Jesus Cristo, nosso Senhor, que vive e reina contigo e com o Espírito Santo, um só Deus, agora e sempre. Amém.'
  },
  {
    id: 'col-pasc-6',
    category: 'ano-cristao',
    season: 'Tempo Pascal',
    title: '6º Domingo da Páscoa',
    prayer: 'Pai amantíssimo, já que tudo quanto é bom provém de ti, dá aos teus humildes servos a inspiração de procurarem a santidade nos pensamentos e nas ações. Mediante Jesus Cristo, nosso Senhor. Amém.'
  },
  {
    id: 'col-pasc-ascensao',
    category: 'ano-cristao',
    season: 'Tempo Pascal',
    title: 'Ascensão de Nosso Senhor Jesus Cristo',
    dateOrSunday: '40º dia do Tempo Pascal',
    prayer: 'Concede, nós te rogamos, Deus Onipotente, que, assim como cremos que teu unigênito Filho, nosso Senhor Jesus Cristo subiu aos céus, também lá subamos em coração e pensamento e habitemos sempre com aquele que vive e reina contigo e com o Espírito Santo, um só Deus, agora e sempre. Amém.'
  },
  {
    id: 'col-pasc-7',
    category: 'ano-cristao',
    season: 'Tempo Pascal',
    title: '7º Domingo da Páscoa',
    prayer: 'Ó Deus, Rei da glória, que exaltaste o teu único Filho Jesus Cristo com grande triunfo ao teu celeste reino; suplicamos-te que não nos deixes desconsolados, mas nos envies o teu Santo Espírito para nos confortar e conduzir ao alto e santo lugar, onde nosso Senhor Jesus Cristo já nos precedeu, o qual vive e reina contigo e com o Espírito Santo, um só Deus, agora e sempre. Amém.'
  },
  {
    id: 'col-pasc-pentecostes',
    category: 'ano-cristao',
    season: 'Tempo Pascal',
    title: 'Dia de Pentecostes',
    dateOrSunday: '50º dia do Tempo Pascal',
    prayer: 'Deus Onipotente, neste dia abriste o caminho da vida eterna a toda raça e nação pela dádiva prometida do teu Santo Espírito, espalha este dom pelo mundo inteiro, mediante a proclamação do Evangelho, para que alcance os confins da terra; por Jesus Cristo, nosso Senhor, que vive e reina contigo e com o Espírito Santo, um só Deus, agora e sempre. Amém.'
  },

  // TEMPO COMUM
  {
    id: 'col-tc-trindade',
    category: 'ano-cristao',
    season: 'Tempo Comum',
    title: 'Santíssima Trindade',
    dateOrSunday: '1º Domingo depois de Pentecostes',
    prayer: 'Deus nosso Pai, enviaste ao mundo a Palavra da verdade e o Espírito da santidade para nos revelar o mistério admirável do teu Ser: concede-nos que na profissão da verdadeira fé reconheçamos a glória da eterna Trindade e adoremos a Unidade na sua onipotência. Mediante nosso Senhor Jesus Cristo. Amém.'
  },
  {
    id: 'col-tc-proprio-1',
    category: 'ano-cristao',
    season: 'Tempo Comum',
    title: 'Próprio 1 (Domingo entre 8 e 14 de maio)',
    prayer: 'Lembra-te, Senhor, da graça que nos concedeste e não dos nossos merecimentos, e, assim como nos chamaste ao teu serviço, faze-nos dignos de nossa vocação; por Jesus Cristo, nosso Senhor, que vive e reina contigo e com o Espírito Santo, um só Deus, agora e sempre. Amém.'
  },
  {
    id: 'col-tc-proprio-2',
    category: 'ano-cristao',
    season: 'Tempo Comum',
    title: 'Próprio 2 (Domingo entre 15 e 21 de maio)',
    prayer: 'Onipotente e misericordioso Deus, fortalece-nos em tua misericórdia, em todas as adversidades, para que, tendo a disposição da mente e do corpo, realizemos com corações alegres tudo quanto pertence ao teu propósito. Por nosso Senhor Jesus Cristo que vive e reina contigo e com o Espírito Santo, um só Deus, agora e sempre. Amém.'
  },
  {
    id: 'col-tc-proprio-3',
    category: 'ano-cristao',
    season: 'Tempo Comum',
    title: 'Próprio 3 (Domingo entre 22 e 28 de maio)',
    prayer: 'Concede, ó Senhor, que o curso deste mundo seja governado em paz pela tua providência; e que tua Igreja possa servir-te com alegria e confiança; por Jesus Cristo, nosso Senhor, que vive e reina contigo e com o Espírito Santo, um só Deus, agora e sempre. Amém.'
  },
  {
    id: 'col-tc-proprio-4',
    category: 'ano-cristao',
    season: 'Tempo Comum',
    title: 'Próprio 4 (Domingo entre 29 de maio e 4 de junho)',
    prayer: 'Ó Deus, cuja infalível providência ordena todas as coisas no céu e na terra, com humildade te imploramos que de nós afastes tudo o que nos possa causar dano e nos outorgues quanto nos seja proveitoso; mediante nosso Senhor Jesus Cristo, que vive e reina contigo e com o Espírito Santo, um só Deus, agora e sempre. Amém.'
  },
  {
    id: 'col-tc-proprio-5',
    category: 'ano-cristao',
    season: 'Tempo Comum',
    title: 'Próprio 5 (Domingo entre 5 e 11 de junho)',
    prayer: 'Ó Senhor, de quem procede todo o bem, concede que, por tua santa inspiração, cogitemos o que é bom, e por tua orientação misericordiosa o executemos. Mediante nosso Senhor Jesus Cristo, que vive e reina contigo e com o Espírito Santo, um só Deus, agora e sempre. Amém.'
  },
  {
    id: 'col-tc-proprio-6',
    category: 'ano-cristao',
    season: 'Tempo Comum',
    title: 'Próprio 6 (Domingo entre 12 e 18 de junho)',
    prayer: 'Guarda, ó Senhor, tua Família, a Igreja, firme na fé, para que, pela tua graça, proclame tua verdade com ousadia e ministre a tua justiça com amor. Mediante nosso Salvador Jesus Cristo, que vive e reina contigo e com o Espírito Santo, um só Deus, agora e sempre. Amém.'
  },
  {
    id: 'col-tc-proprio-7',
    category: 'ano-cristao',
    season: 'Tempo Comum',
    title: 'Próprio 7 (Domingo entre 19 e 25 de junho)',
    prayer: 'Ó Senhor, faze com que tenhamos amor e reverência constantes, porque nunca deixas de ajudar e governar os que colocaste sobre o fundamento seguro de tua bondade; mediante nosso Senhor Jesus Cristo, que vive e reina contigo e com o Espírito Santo, um só Deus, agora e sempre. Amém.'
  },
  {
    id: 'col-tc-proprio-8',
    category: 'ano-cristao',
    season: 'Tempo Comum',
    title: 'Próprio 8 (Domingo entre 26 de junho e 2 de julho)',
    prayer: 'Deus Onipotente, que edificaste tua Igreja sobre o fundamento dos Apóstolos e Profetas, sendo Jesus Cristo mesmo a principal pedra angular; concede que sejamos unidos em espírito por meio de seu ensino e feitos um santo templo aceitável a teus olhos; mediante nosso Senhor Jesus Cristo, que vive e reina contigo e com o Espírito Santo, um só Deus, agora e sempre. Amém.'
  },
  {
    id: 'col-tc-proprio-9',
    category: 'ano-cristao',
    season: 'Tempo Comum',
    title: 'Próprio 9 (Domingo entre 3 e 9 de julho)',
    prayer: 'Ó Deus, ensinaste-nos que amar a ti e ao nosso próximo é guardar os teus mandamentos; concede-nos a graça do teu Espírito Santo para que sejamos consagrados a ti com todo o nosso coração e unidos uns aos outros com pura afeição; por Jesus Cristo, nosso Senhor, que vive e reina contigo e com o Espírito Santo, um só Deus, agora e sempre. Amém.'
  },
  {
    id: 'col-tc-proprio-10',
    category: 'ano-cristao',
    season: 'Tempo Comum',
    title: 'Próprio 10 (Domingo entre 10 e 16 de julho)',
    prayer: 'Ó Senhor, suplicamos-te que recebas, com piedade celestial, as orações do teu povo que te invoca: e concede que todos saibam e compreendam o que devem fazer e tenham a graça e poder para fielmente o realizar. Mediante nosso Senhor Jesus Cristo, que vive e reina contigo e com o Espírito Santo, um só Deus, agora e sempre. Amém.'
  },
  {
    id: 'col-tc-proprio-11',
    category: 'ano-cristao',
    season: 'Tempo Comum',
    title: 'Próprio 11 (Domingo entre 17 e 23 de julho)',
    prayer: 'Deus Onipotente, fonte de toda a sabedoria, que tanto conheces de antemão as nossas necessidades, quanto nós ignoramos o que pedir; tem compaixão de nossas fraquezas, e concede-nos tudo o que, por indignidade ou cegueira nossa, não ousamos nem sabemos suplicar, senão pelos merecimentos de teu Filho Jesus Cristo, nosso Senhor, que vive e reina contigo e com o Espírito Santo, um só Deus, agora e sempre. Amém.'
  },
  {
    id: 'col-tc-proprio-12',
    category: 'ano-cristao',
    season: 'Tempo Comum',
    title: 'Próprio 12 (Domingo entre 24 e 30 de julho)',
    prayer: 'Ó Deus, protetor dos que em ti confiam, sem o qual nada é forte, nada é santo; acrescenta e multiplica a tua misericórdia para conosco, a fim de que, sob o teu governo e direção, vivamos esta vida de tal maneira que não percamos a vida eterna. Por nosso Senhor Jesus Cristo, que vive e reina contigo e com o Espírito Santo, um só Deus, agora e sempre. Amém.'
  },
  {
    id: 'col-tc-proprio-13',
    category: 'ano-cristao',
    season: 'Tempo Comum',
    title: 'Próprio 13 (Domingo entre 31 de julho e 6 de agosto)',
    prayer: 'Permite, ó Senhor, que a tua contínua misericórdia purifique e defenda a tua Igreja; e, porquanto ela não pode continuar em segurança sem teu socorro, preserva-a sempre com teu auxílio e bondade; por Jesus Cristo, nosso Senhor, que vive e reina contigo e com o Espírito Santo, um só Deus, agora e sempre. Amém.'
  },
  {
    id: 'col-tc-proprio-14',
    category: 'ano-cristao',
    season: 'Tempo Comum',
    title: 'Próprio 14 (Domingo entre 7 e 13 de agosto)',
    prayer: 'Concede-nos, Senhor, te rogamos, a graça de pensar e executar sempre o que é justo e bom, para que nós, que sem ti nada podemos, por ti nos tornemos capazes de viver conforme a tua vontade; mediante nosso Senhor Jesus Cristo, que vive e reina contigo e com o Espírito Santo, um só Deus, agora e sempre. Amém.'
  },
  {
    id: 'col-tc-proprio-15',
    category: 'ano-cristao',
    season: 'Tempo Comum',
    title: 'Próprio 15 (Domingo entre 14 e 20 de agosto)',
    prayer: 'Deus Onipotente, que deste teu único Filho não só em sacrifício pelo pecado, mas também para exemplo de santidade, dá-nos a graça de sempre receber com gratidão os frutos de sua obra redentora e de seguir diariamente os bem-aventurados passos de sua santíssima vida. Mediante nosso Senhor Jesus Cristo, que vive e reina contigo e com o Espírito Santo, um só Deus, agora e sempre. Amém.'
  },
  {
    id: 'col-tc-proprio-16',
    category: 'ano-cristao',
    season: 'Tempo Comum',
    title: 'Próprio 16 (Domingo entre 21 e 27 de agosto)',
    prayer: 'Ó Misericordioso Deus, concede que a tua Igreja, unida pelo Espírito Santo, manifeste o teu poder entre todos os povos, para a glória do teu nome. Mediante Jesus Cristo, nosso Senhor, que vive e reina contigo e com o Espírito Santo, um só Deus, agora e sempre. Amém.'
  },
  {
    id: 'col-tc-proprio-17',
    category: 'ano-cristao',
    season: 'Tempo Comum',
    title: 'Próprio 17 (Domingo entre 28 de agosto e 3 de setembro)',
    prayer: 'Senhor de todo o poder e majestade, autor e dispensador de todo o bem; enxerta em nossos corações o amor do teu nome; aumenta em nós a verdadeira religião, nutre-nos com toda a bondade e frutifica em nós as boas obras; por Jesus Cristo, nosso Senhor, que vive e reina contigo e com o Espírito Santo, um só Deus, agora e sempre. Amém.'
  },
  {
    id: 'col-tc-proprio-18',
    category: 'ano-cristao',
    season: 'Tempo Comum',
    title: 'Próprio 18 (Domingo entre 4 e 10 de setembro)',
    prayer: 'Concede-nos, Senhor, que confiemos em ti com todo o nosso coração, porque assim como tu resistes aos orgulhosos, que se vangloriam de sua própria força, também nunca abandonas os que exaltam a tua misericórdia; por Jesus Cristo, nosso Senhor, que vive e reina contigo e com o Espírito Santo, um só Deus, agora e sempre. Amém.'
  },
  {
    id: 'col-tc-proprio-19',
    category: 'ano-cristao',
    season: 'Tempo Comum',
    title: 'Próprio 19 (Domingo entre 11 e 17 de setembro)',
    prayer: 'Ó Deus, visto que sem ti não te podemos agradar, misericordioso, permite que teu Santo Espírito dirija e governe os nossos corações; mediante nosso Senhor Jesus Cristo, que vive e reina contigo e com o Espírito Santo, um só Deus, agora e sempre. Amém.'
  },
  {
    id: 'col-tc-proprio-20',
    category: 'ano-cristao',
    season: 'Tempo Comum',
    title: 'Próprio 20 (Domingo entre 18 e 24 de setembro)',
    prayer: 'Pai celestial, concede, ó Senhor, que não andemos ansiosos quanto às coisas terrenas, que são passageiras, mas que amemos as celestiais que permanecem para sempre. Por Jesus Cristo, nosso Senhor, que vive e reina contigo e com o Espírito Santo, um só Deus, agora e sempre. Amém.'
  },
  {
    id: 'col-tc-proprio-21',
    category: 'ano-cristao',
    season: 'Tempo Comum',
    title: 'Próprio 21 (Domingo entre 25 de setembro e 1º de outubro)',
    prayer: 'Ó Deus, cuja onipotência se revela principalmente em misericórdia e compaixão; concede-nos a plenitude da tua graça, para que, esforçando-nos para alcançar as tuas promessas, sejamos feitos participantes do teu tesouro celestial; por Jesus Cristo, nosso Senhor, que vive e reina contigo e com o Espírito Santo, um só Deus, agora e sempre. Amém.'
  },
  {
    id: 'col-tc-proprio-22',
    category: 'ano-cristao',
    season: 'Tempo Comum',
    title: 'Próprio 22 (Domingo entre 2 e 8 de outubro)',
    prayer: 'Onipotente e sempiterno Deus, que sempre estás mais pronto a ouvir do que nós a suplicar, e nos dás mais do que desejamos ou merecemos; derrama sobre nós a tua misericórdia, perdoando o que nos pesa na consciência e dando-nos as bênçãos que não somos dignos de pedir, senão pelos merecimentos de Jesus Cristo teu Filho, nosso Senhor, que vive e reina contigo e com o Espírito Santo, um só Deus, agora e sempre. Amém.'
  },
  {
    id: 'col-tc-proprio-23',
    category: 'ano-cristao',
    season: 'Tempo Comum',
    title: 'Próprio 23 (Domingo entre 9 e 15 de outubro)',
    prayer: 'Rogamos-te, Senhor, que a tua graça sempre nos preceda e acompanhe, inspirando-nos a perseverar na prática de boas obras; mediante Jesus Cristo, nosso Senhor, que vive e reina contigo e com o Espírito Santo, um só Deus, agora e sempre. Amém.'
  },
  {
    id: 'col-tc-proprio-24',
    category: 'ano-cristao',
    season: 'Tempo Comum',
    title: 'Próprio 24 (Domingo entre 16 e 22 de outubro)',
    prayer: 'Onipotente e sempiterno Deus, que em Cristo tens revelado tua glória entre as nações. Mantém viva esta obra, por tua misericórdia, para que a tua Igreja pelo mundo inteiro persevere com fé inabalável na confissão do teu nome; mediante Jesus Cristo, nosso Senhor, que vive e reina contigo e com o Espírito Santo, um só Deus, agora e sempre. Amém.'
  },
  {
    id: 'col-tc-proprio-25',
    category: 'ano-cristao',
    season: 'Tempo Comum',
    title: 'Próprio 25 (Domingo entre 23 e 29 de outubro)',
    prayer: 'Onipotente e eterno Deus, aumenta em nós a fé, a esperança e o amor; e para que alcancemos as tuas promessas, inclina-nos a amar o que nos ordenas; por Jesus Cristo, nosso Senhor, que vive e reina contigo e com o Espírito Santo, um só Deus, agora e sempre. Amém.'
  },
  {
    id: 'col-tc-proprio-26',
    category: 'ano-cristao',
    season: 'Tempo Comum',
    title: 'Próprio 26 (Domingo entre 30 de outubro e 5 de novembro)',
    prayer: 'Onipotente e misericordioso Deus, de quem procede a graça de teus servos te servirem bem e agradavelmente; permite que te sirvamos com tanta fidelidade nesta vida, que alcancemos finalmente as tuas promessas celestiais; pelos merecimentos de Jesus Cristo, nosso Senhor, que vive e reina contigo e com o Espírito Santo, um só Deus, agora e sempre. Amém.'
  },
  {
    id: 'col-tc-proprio-27',
    category: 'ano-cristao',
    season: 'Tempo Comum',
    title: 'Próprio 27 (Domingo entre 6 e 12 de novembro)',
    prayer: 'Ó Deus, cujo Filho, para sempre bendito, foi manifestado para destruir as obras do maligno e tornar-nos filhos de Deus e herdeiros da vida eterna; permite, nós te suplicamos, que nesta esperança nos purifiquemos, assim como ele é puro; para que, quando vier outra vez com poder e grande glória, sejamos feitos semelhantes a ele no seu eterno e glorioso reino, onde contigo, Pai, e com o Espírito Santo, vive e reina sempre, um só Deus, pelos séculos dos séculos. Amém.'
  },
  {
    id: 'col-tc-proprio-28',
    category: 'ano-cristao',
    season: 'Tempo Comum',
    title: 'Próprio 28 (Domingo entre 13 e 19 de novembro)',
    prayer: 'Ó Deus Onipotente, que enviaste a tua Igreja até os confins da terra para reunir um povo agradável aos teus olhos; concede que permaneçamos vigilantes e fiéis nesta Missão, de tal maneira que, mesmo que se abalem as estruturas deste mundo, proclamemos que Jesus Cristo teu Filho, vive e reina contigo e com o Espírito Santo, um só Deus, agora e sempre. Amém.'
  },
  {
    id: 'col-tc-cristo-rei',
    category: 'ano-cristao',
    season: 'Tempo Comum',
    title: 'Cristo Rei do Universo (Próprio 29 · Domingo entre 20 e 26 de novembro)',
    prayer: 'Senhor soberano, Onipotente e sempiterno Deus, cuja vontade é restaurar todas as coisas em teu amado Filho, o Rei dos Reis, Senhor dos senhores; misericordioso concede que os povos da terra, divididos e escravizados pelo pecado, sejam libertados e reunidos em seu reino de amor; o qual vive e reina contigo e com o Espírito Santo, um só Deus, agora e sempre. Amém.'
  },

  // DIAS SANTOS
  {
    id: 'col-ds-santo-nome',
    category: 'dias-santos',
    title: 'Santo Nome e Circuncisão de Nosso Senhor Jesus Cristo',
    dateOrSunday: '1º de janeiro',
    prayer: 'Pai misericordioso, ensinaste-nos não haver salvação noutro nome que não seja o de Jesus; ensina-nos a glorificar o seu nome e a tornar conhecida a sua salvação em todo o mundo. Mediante Jesus Cristo, nosso Senhor. Amém.'
  },
  {
    id: 'col-ds-confissao-pedro',
    category: 'dias-santos',
    title: 'Confissão de Pedro',
    dateOrSunday: '18 de janeiro',
    prayer: 'Pai Todo-Poderoso, que inspiraste Simão Pedro, o primeiro dentre os apóstolos, a confessar Jesus como o Messias e o Filho do Deus vivo: conserva a tua Igreja firme sobre a rocha desta fé, para que, em unidade e paz, proclamemos a única verdade e sigamos o único Senhor, nosso Salvador Jesus Cristo; que vive e reina contigo e com o Espírito Santo, um só Deus, agora e sempre. Amém.'
  },
  {
    id: 'col-ds-conversao-paulo',
    category: 'dias-santos',
    title: 'Conversão de Paulo',
    dateOrSunday: '25 de janeiro',
    prayer: 'Ó Deus, instruíste o mundo inteiro com a palavra do Apóstolo Paulo de quem celebramos hoje a conversão; concede-nos a graça de, imitando-o, caminharmos para ti e sermos no mundo testemunhas do teu Evangelho. Por nosso Senhor Jesus Cristo, teu Filho, na unidade do Espírito Santo. Amém.'
  },
  {
    id: 'col-ds-apresentacao',
    category: 'dias-santos',
    title: 'Apresentação de Nosso Senhor Jesus Cristo no Templo',
    dateOrSunday: '2 de fevereiro',
    prayer: 'Pai Onipotente, teu Filho Jesus Cristo foi apresentado no templo, sendo proclamado a glória de Israel e a luz das nações; concede-nos que por ele sejamos apresentados a ti e possamos refletir a tua glória no mundo. Mediante Jesus Cristo, nosso Senhor. Amém.'
  },
  {
    id: 'col-ds-matias',
    category: 'dias-santos',
    title: 'Matias, Apóstolo',
    dateOrSunday: '24 de fevereiro',
    prayer: 'Senhor Deus, o teu servo Matias foi escolhido em substituição de Judas Iscariotes, para ser um dos apóstolos; preserva a tua Igreja de falsos apóstolos, e, pelo ministério de pastores e mestres fiéis, guarda-nos firmes na tua verdade. Mediante Jesus Cristo, nosso Senhor. Amém.'
  },
  {
    id: 'col-ds-jose',
    category: 'dias-santos',
    title: 'José de Nazaré, Esposo de Maria e Guardião de Jesus',
    dateOrSunday: '19 de março',
    prayer: 'Deus Onipotente, chamaste José a ser o esposo da Virgem Maria, e o guardião do teu único Filho; abre os nossos olhos e os nossos ouvidos às mensagens da tua santa vontade, e dá-nos a coragem de agir de acordo com ela. Mediante Jesus Cristo, nosso Senhor. Amém.'
  },
  {
    id: 'col-ds-anunciacao',
    category: 'dias-santos',
    title: 'Anunciação de Nosso Senhor Jesus Cristo à Maria',
    dateOrSunday: '25 de março',
    prayer: 'Suplicamos-te, Senhor, que derrames a tua graça nos nossos corações, para que assim como conhecemos a encarnação de teu Filho Jesus Cristo, também pela sua cruz e paixão alcancemos a glória da sua ressurreição. Mediante o mesmo Jesus Cristo, nosso Senhor. Amém.'
  },
  {
    id: 'col-ds-marcos',
    category: 'dias-santos',
    title: 'Marcos, Evangelista',
    dateOrSunday: '25 de abril',
    prayer: 'Deus Onipotente, iluminaste a tua Igreja através do testemunho inspirado do teu evangelista Marcos; fundamenta-nos firmemente na verdade do Evangelho, e faz-nos fiéis ao seu ensino. Mediante Jesus Cristo, nosso Senhor. Amém.'
  },
  {
    id: 'col-ds-filipe-tiago',
    category: 'dias-santos',
    title: 'Filipe e Tiago Menor, Apóstolos',
    dateOrSunday: '1º de maio',
    prayer: 'Pai eterno, os apóstolos Filipe e Tiago conheceram no teu Filho o caminho vivo e verdadeiro; concede-nos a graça de os seguirmos ao longo desse caminho que conduz à vida eterna. Mediante Jesus Cristo, nosso Senhor. Amém.'
  },
  {
    id: 'col-ds-visitacao',
    category: 'dias-santos',
    title: 'Visitação de Maria, mãe de nosso Senhor',
    dateOrSunday: '31 de maio',
    prayer: 'Deus Onipotente, escolheste a bem-aventurada Virgem Maria para ser a mãe do teu único Filho; concede-nos a nós, redimidos pelo Sangue de Jesus, a graça de estarmos com ela na glória do teu reino eterno. Mediante Jesus Cristo, nosso Senhor, que vive e reina, contigo e com o Espírito Santo. Amém.'
  },
  {
    id: 'col-ds-barnabe',
    category: 'dias-santos',
    title: 'Barnabé, Apóstolo',
    dateOrSunday: '11 de junho',
    prayer: 'Senhor Deus, teu Filho Jesus Cristo ensinou-nos ser coisa mais abençoada dar que receber; ajuda-nos, com o exemplo do teu apóstolo Barnabé, a ser magnânimos a julgar e generosos a servir. Mediante Jesus Cristo, nosso Senhor. Amém.'
  },
  {
    id: 'col-ds-nativ-joao-batista',
    category: 'dias-santos',
    title: 'Natividade de João Batista',
    dateOrSunday: '24 de junho',
    prayer: 'Senhor Deus, o teu servo João Batista nasceu maravilhosamente e preparou o caminho para o advento de teu Filho; ajuda-nos a conhecer Jesus Cristo como nosso Salvador e a obter por meio dele o perdão dos nossos pecados. Ele que vive e reina, contigo e com o Espírito Santo, um só Deus, para todo o sempre. Amém.'
  },
  {
    id: 'col-ds-pedro-paulo',
    category: 'dias-santos',
    title: 'Pedro e Paulo, Apóstolos',
    dateOrSunday: '29 de junho',
    prayer: 'Deus Onipotente, os teus apóstolos Pedro e Paulo glorificaram-te tanto na vida como na morte; inspira a tua Igreja a seguir os seus exemplos e a permanecer firme no único fundamento que é Cristo, nosso Senhor, a quem, contigo e com o Espírito Santo, seja dada honra e glória, agora e para sempre. Amém.'
  },
  {
    id: 'col-ds-madalena',
    category: 'dias-santos',
    title: 'Maria Madalena',
    dateOrSunday: '22 de julho',
    prayer: 'Senhor misericordioso, teu Filho restituiu a Maria Madalena a saúde do corpo e da mente e chamou-a a ser testemunha da sua ressurreição; purifica-nos e renova-nos para te servirmos no poder da vida ressuscitada de Jesus, o qual, contigo e com o Espírito Santo, vive e reina, um só Deus, agora e sempre. Amém.'
  },
  {
    id: 'col-ds-tiago-maior',
    category: 'dias-santos',
    title: 'Tiago, Apóstolo',
    dateOrSunday: '25 de julho',
    prayer: 'Senhor Deus, o teu apóstolo Tiago consentiu em deixar seu pai e tudo o que possuía e ainda em sofrer pelo nome do teu Filho; ajuda-nos misericordioso para que nenhum dos laços terrenos nos afaste do teu serviço. Mediante Jesus Cristo, nosso Senhor. Amém.'
  },
  {
    id: 'col-ds-maria-mae',
    category: 'dias-santos',
    title: 'Maria, mãe de nosso Senhor',
    dateOrSunday: '15 de agosto',
    prayer: 'Deus Onipotente, escolheste a bem-aventurada Virgem Maria para ser a mãe do teu único Filho; concede-nos a nós, redimidos pelo Sangue de Jesus, a graça de estarmos com ela na glória do teu reino eterno. Mediante Jesus Cristo, nosso Senhor, que vive e reina, contigo e com o Espírito Santo. Amém.'
  },
  {
    id: 'col-ds-bartolomeu',
    category: 'dias-santos',
    title: 'Bartolomeu, Apóstolo',
    dateOrSunday: '24 de agosto',
    prayer: 'Deus eterno, deste ao teu apóstolo Bartolomeu a graça de crer e de pregar a tua Palavra; permite que a tua Igreja ame a Palavra em que ele creu e fielmente lhe obedeça e a proclame. Mediante Jesus Cristo, nosso Senhor. Amém.'
  },
  {
    id: 'col-ds-santa-cruz',
    category: 'dias-santos',
    title: 'Dia da Santa Cruz',
    dateOrSunday: '14 de setembro',
    prayer: 'Deus Todo-Poderoso, cujo Filho, nosso Salvador Jesus Cristo, foi elevado ao alto na Cruz para atrair a si o mundo inteiro: concede-nos misericordiosamente que nós, que nos gloriamos no mistério da nossa redenção, tenhamos a graça de tomar a nossa cruz e segui-lo; que vive e reina contigo e com o Espírito Santo, um só Deus, na glória eterna. Amém.'
  },
  {
    id: 'col-ds-mateus',
    category: 'dias-santos',
    title: 'Mateus, Apóstolo e Evangelista',
    dateOrSunday: '21 de setembro',
    prayer: 'Deus nosso Salvador, teu Filho chamou Mateus a ser apóstolo e evangelista; livra-nos de ser possessivos e amantes do dinheiro e inspira-nos a seguir Jesus Cristo, que vive e reina contigo e com o Espírito Santo, um só Deus, agora e para sempre. Amém.'
  },
  {
    id: 'col-ds-arcanjo-miguel',
    category: 'dias-santos',
    title: 'Arcanjo Miguel e Todos os Anjos',
    dateOrSunday: '29 de setembro',
    prayer: 'Senhor Deus das hostes celestiais, criaste os anjos para te adorarem e servirem; concede que, inspirando o nosso culto, eles nos socorram e fortaleçam na nossa luta contra o mal. Mediante Jesus Cristo, nosso Senhor. Amém.'
  },
  {
    id: 'col-ds-lucas',
    category: 'dias-santos',
    title: 'Lucas, Evangelista',
    dateOrSunday: '18 de outubro',
    prayer: 'Pai de toda a graça, tu inspiraste o médico Lucas a anunciar o amor e o poder de cura do teu Filho; dá à tua Igreja, pela graça do Espírito, o mesmo amor e o mesmo poder de curar. Mediante Jesus Cristo, nosso Senhor. Amém.'
  },
  {
    id: 'col-ds-tiago-jerusalem',
    category: 'dias-santos',
    title: 'Tiago de Jerusalém, Irmão de nosso Senhor Jesus Cristo',
    dateOrSunday: '23 de outubro',
    prayer: 'Concede, ó Deus, que, seguindo o exemplo do teu apóstolo Tiago, o Justo, parente de nosso Senhor, a tua Igreja se entregue continuamente à oração e à reconciliação de todos os que vivem em discórdia e inimizade; por Jesus Cristo, nosso Senhor, que vive e reina contigo e com o Espírito Santo, um só Deus, agora e sempre. Amém.'
  },
  {
    id: 'col-ds-simao-judas',
    category: 'dias-santos',
    title: 'Simão e Judas, Apóstolos',
    dateOrSunday: '28 de outubro',
    prayer: 'Senhor Deus, edificaste a tua Igreja mediante apóstolos e profetas, sendo Jesus Cristo a sua pedra angular; permite que, auxiliados pela sua doutrina, nos reunamos na unidade do Espírito e nos tornemos templo santo aceitável por ti. Mediante Jesus Cristo, nosso Senhor. Amém.'
  },
  {
    id: 'col-ds-todos-santos',
    category: 'dias-santos',
    title: 'Todos os Santos e Santas',
    dateOrSunday: '1º de novembro',
    prayer: 'Senhor de toda a graça, juntaste os teus santos na comunhão da tua Igreja e criaste para eles alegrias que ultrapassam o nosso entendimento; ajuda-nos a imitá-los na nossa vida diária e conduz-nos com eles à glória eterna. Mediante Jesus Cristo, nosso Senhor. Amém.'
  },
  {
    id: 'col-ds-andre',
    category: 'dias-santos',
    title: 'André, Apóstolo',
    dateOrSunday: '30 de novembro',
    prayer: 'Senhor Deus, pela tua graça o apóstolo André obedeceu à chamada do teu Filho Jesus Cristo e seguiu-o sem demora; concede-nos o dom de nos entregarmos a ti em alegre obediência. Mediante Jesus Cristo, nosso Senhor. Amém.'
  },
  {
    id: 'col-ds-tome',
    category: 'dias-santos',
    title: 'Tomé, Apóstolo',
    dateOrSunday: '21 de dezembro',
    prayer: 'Deus eterno, o teu apóstolo Tomé duvidou da ressurreição do teu Filho até que a palavra e a vista o convenceram; concede-nos, a nós que não vimos, a graça de não sermos infiéis, mas crentes. Mediante Jesus Cristo, nosso Senhor. Amém.'
  },
  {
    id: 'col-ds-estevao',
    category: 'dias-santos',
    title: 'Estêvão, Diácono e Mártir da Fé',
    dateOrSunday: '26 de dezembro',
    prayer: 'Pai celestial, deste ao teu mártir Estêvão a graça de orar por aqueles que o apedrejaram; concede que, ao sofrermos pela verdade, imitemos o seu exemplo de perdão. Mediante Jesus Cristo, nosso Senhor. Amém.'
  },
  {
    id: 'col-ds-joao',
    category: 'dias-santos',
    title: 'João, Apóstolo e Evangelista',
    dateOrSunday: '27 de dezembro',
    prayer: 'Senhor misericordioso, iluminaste a tua Igreja com o ensino de João; lança sobre nós os brilhantes raios da tua luz para podermos caminhar na tua verdade e chegar finalmente ao teu eterno esplendor. Mediante Jesus Cristo, nosso Senhor. Amém.'
  },
  {
    id: 'col-ds-inocentes',
    category: 'dias-santos',
    title: 'Santos Inocentes',
    dateOrSunday: '28 de dezembro',
    prayer: 'Pai celestial, crianças sofreram às mãos de Herodes, embora nenhum mal tivessem feito; dá-nos a graça de não sermos indiferentes perante a crueldade ou a opressão, mas prontos a defender os fracos da tirania dos fortes. Mediante Jesus Cristo, nosso Senhor. Amém.'
  },

  // COMEMORAÇÕES
  {
    id: 'col-com-ieab',
    category: 'comemoracoes',
    title: 'Primeiro Culto Anglicano no Brasil (IEAB)',
    dateOrSunday: '1º de junho',
    prayer: 'Ó Deus trino, que no Domingo da Santíssima Trindade deste início à missão anglicana entre o povo brasileiro, enviando os teus servos Lucien Kinsolving e James Morris a celebrarem, em Porto Alegre, o primeiro culto neste ramo temporário da sua igreja: concede que a fé então semeada floresça em cada geração, para que, firmes na tua verdade e ardentes no teu amor, anunciemos o teu Evangelho por toda esta terra; por Jesus Cristo, nosso Senhor, que vive e reina contigo, na unidade do Espírito Santo, um só Deus, agora e sempre. Amém.'
  },
  {
    id: 'col-com-patria',
    category: 'comemoracoes',
    title: 'Dia da Pátria',
    dateOrSunday: '7 de setembro',
    prayer: 'Ó Onipotente Senhor, criaste todos os povos da terra para a tua glória, a fim de te servirem em liberdade e paz; concede ao povo de nosso País o zelo pela justiça e a virtude da moderação e da paciência, para que usemos a nossa liberdade conforme a tua benigna vontade; por Jesus Cristo, nosso Senhor, que vive e reina contigo e com o Espírito Santo, um só Deus, agora e sempre. Amém.'
  },
  {
    id: 'col-com-reforma',
    category: 'comemoracoes',
    title: 'Dia da Reforma',
    dateOrSunday: '31 de outubro',
    prayer: 'Senhor Todo-Poderoso e misericordioso, derrama o teu Espírito Santo sobre o teu povo fiel: conserva-o firme na tua Palavra, ampara-o e consola-o em toda tentação, defende-o de todos os seus inimigos e concede à tua Igreja a tua paz salvadora, para que, purificada e renovada pelo teu Evangelho, ela manifeste a todas as nações a glória do teu Reino; por Jesus Cristo, nosso Senhor, que vive e reina contigo e com o Espírito Santo, um só Deus, agora e sempre. Amém.'
  },
  {
    id: 'col-com-almas',
    category: 'comemoracoes',
    title: 'Memorial de Todas as Almas',
    dateOrSunday: '2 de novembro',
    prayer: 'Ó eterno Senhor Deus, que sustentas na vida todas as almas: derrama sobre a tua Igreja inteira, no Paraíso e na terra, os luminosos raios da tua luz e do teu consolo celestial; e concede que nós, seguindo o bom exemplo daqueles que aqui te amaram e te serviram e agora descansam, possamos entrar com eles na plenitude da tua alegria sem fim; por Jesus Cristo, nosso Senhor. Amém.'
  },
  {
    id: 'col-com-santos-anglicanos',
    category: 'comemoracoes',
    title: 'Todos os Santos e Santas da Comunhão Anglicana',
    dateOrSunday: '8 de novembro',
    prayer: 'Senhor de toda a graça, juntaste os teus santos na comunhão da tua Igreja e criaste para eles alegrias que ultrapassam o nosso entendimento; ajuda-nos a imitá-los na nossa vida diária e conduz-nos com eles à glória eterna. Mediante Jesus Cristo, nosso Senhor. Amém.'
  },

  // COLETAS COMUNS (pp. 132–134 do livro). O "N." é o nome da pessoa
  // celebrada, preenchido no momento do uso.
  {
    id: 'col-comum-martires',
    category: 'comuns',
    title: 'Comum dos Mártires',
    prayer: 'Deus Todo-Poderoso, que deste ao teu servo N., a ousadia de confessar diante dos poderosos deste mundo o nome glorioso de teu Filho e de morrer como mártir pela fé cristã, ajuda-nos a seguir o seu supremo exemplo de renúncia e a viver nossa vida, prontos a dar a razão da esperança que há em nós e, se necessário, a morrer por esta esperança; por Jesus Cristo teu Filho, nosso Senhor, que vive e reina contigo e com o Espírito Santo, um só Deus agora e sempre. Amém.'
  },
  {
    id: 'col-comum-missionarios',
    category: 'comuns',
    title: 'Comum dos Missionários',
    prayer: 'Deus Todo-Poderoso e eterno, damos-te graças por teu servo N., a quem chamaste para pregar o Evangelho ao povo de N.; desperta, neste e em todos os povos, evangelistas e mensageiros do teu reino, para que a tua Igreja proclame as insondáveis riquezas de nosso Salvador Jesus Cristo teu Filho, que vive e reina contigo e com o Espírito Santo, um só Deus agora e sempre. Amém.'
  },
  {
    id: 'col-comum-pastores',
    category: 'comuns',
    title: 'Comum dos Pastores / Bispos',
    prayer: 'Ó Senhor, tu que és Pastor e Bispo das nossas almas e que escolheste teu servo N. para ser [Bispo e] Pastor na tua Igreja, ajuda-o, com teu poder, a apascentar o teu rebanho; e concede, pelo teu Espírito, a todos os pastores, dons, talentos e habilidades, para que, como verdadeiros servos de Cristo e fiéis despenseiros dos teus divinos mistérios, ministrem ao teu povo; por Jesus Cristo, teu Filho, nosso Senhor, que vive e reina contigo e com o Espírito Santo, um só Deus agora e sempre. Amém.'
  },
  {
    id: 'col-comum-teologos',
    category: 'comuns',
    title: 'Comum dos Teólogos, Mestres e Confessores',
    prayer: 'Ó Deus, que pelo Espírito Santo concedes dons especiais para que possamos entender e ensinar a tua Palavra, louvamos o teu nome pela graça manifestada ao teu servo N., a quem capacitaste, e suplicamos que a tua Igreja seja sempre provida com esses dons; por Jesus Cristo teu Filho, nosso Senhor, que vive e reina contigo e com o Espírito Santo, um só Deus agora e sempre. Amém.'
  },
  {
    id: 'col-comum-comunidade',
    category: 'comuns',
    title: 'Comum dos Membros de Comunidade ou Ordem Religiosa',
    prayer: 'Ó Deus, cujo bendito Filho viveu vida consagrada a ti, liberta-nos do amor indevido por este mundo, para que, inspirados na vida consagrada do teu servo N., te sirvamos alegremente e com ele alcancemos a herança da vida eterna; por Jesus Cristo teu Filho, nosso Senhor, que vive e reina contigo e com o Espírito Santo, um só Deus agora e sempre. Amém.'
  },
  {
    id: 'col-comum-ecumenistas',
    category: 'comuns',
    title: 'Comum dos Ecumenistas',
    prayer: 'Deus Todo-Poderoso, que nos manténs em unidade com todos os teus santos no céu e na terra, permite que fortalecidos pelo bom exemplo de teu servo N., e imitando a sua fé, sejamos continuamente sustentados por esta comunhão de fé e oração, sabedores que pela intercessão de Jesus Cristo teu Filho, nosso Senhor, as nossas orações são aceitáveis a ti, ó Pai, por meio do Espírito Santo, um só Deus agora e sempre. Amém.'
  },
  {
    id: 'col-comum-reformadores',
    category: 'comuns',
    title: 'Comum dos Reformadores',
    prayer: 'Recebe, Senhor, nós te rogamos, as preces da tua Igreja, hoje quando nos lembramos de teu servo N. e de sua luta em favor do cristianismo reformado. Concede a nós a coragem deste irmão do passado para que lutemos com fé e coragem pela fé uma vez dada aos santos. Mediante Jesus Cristo, nosso Salvador. Amém.'
  },
  {
    id: 'col-comum-renovadores',
    category: 'comuns',
    title: 'Comum dos Renovadores da Sociedade',
    prayer: 'Deus Todo-Poderoso, que nos manténs em unidade com todos os teus santos no céu e na terra, permite que fortalecidos pelo bom exemplo de teu servo N., e imitando a sua fé, sejamos continuamente sustentados por esta comunhão de fé e oração, sabedores que pela intercessão de Jesus Cristo teu Filho, nosso Senhor, as nossas orações são aceitáveis a ti, ó Pai, por meio do Espírito Santo, um só Deus agora e sempre. Amém.'
  },
  {
    id: 'col-comum-santos',
    category: 'comuns',
    title: 'Comum dos Santos e Santas',
    prayer: 'Deus Todo-Poderoso, que nos manténs em unidade com todos os teus santos no céu e na terra, permite que fortalecidos pelo bom exemplo de teu servo N., e imitando a sua fé, sejamos continuamente sustentados por esta comunhão de fé e oração, sabedores que pela intercessão de Jesus Cristo teu Filho, nosso Senhor, as nossas orações são aceitáveis a ti, ó Pai, por meio do Espírito Santo, um só Deus agora e sempre. Amém.'
  }
];
