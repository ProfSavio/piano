# 🎹 Piano — Trabalhando com Assets

Este projeto implementa um piano digital utilizando **HTML, CSS e JavaScript**.

Mais do que construir uma aplicação interativa, este repositório foi pensado como um material de apoio para estudar um conceito fundamental no desenvolvimento de Jogos Digitais:

> **Assets são os recursos utilizados por um projeto para construir sua experiência visual, sonora e interativa.**

Neste projeto, o principal tipo de asset utilizado são os **arquivos de áudio** que representam as notas do piano.

A partir deles, podemos observar como um jogo ou aplicação deixa de ser apenas código e passa a combinar:

```text
CÓDIGO
  +
ASSETS
  ↓
EXPERIÊNCIA INTERATIVA
```

---

# 📋 Requisitos do projeto

Antes de observar o código, é importante identificar o que o piano precisa fazer.

O projeto deve:

* apresentar visualmente um teclado de piano;
* permitir que o usuário clique nas teclas;
* permitir que o usuário utilize o teclado físico do computador;
* associar cada tecla visual a uma tecla do teclado;
* reproduzir o som correspondente à tecla acionada;
* indicar visualmente qual tecla está sendo pressionada;
* permitir controlar o volume;
* permitir mostrar ou ocultar as letras de identificação das teclas.

No HTML, as teclas são representadas por elementos `<li>` e possuem um atributo `data-key` que estabelece sua correspondência com o teclado do computador.

Por exemplo:

```html
<li class="tecla branca" data-key="a">
    <span>a</span>
</li>
```

A informação:

```text
data-key="a"
```

é utilizada pelo JavaScript para identificar a tecla.

---

# 🎨 O que são Assets?

Em um projeto de Jogos Digitais, **assets** são os recursos utilizados para construir o conteúdo e a experiência do jogo.

Podemos ter diferentes tipos de assets:

| Tipo         | Exemplos                                   |
| ------------ | ------------------------------------------ |
| 🎵 Áudio     | músicas, efeitos sonoros, vozes            |
| 🖼️ Imagem   | sprites, texturas, ícones, planos de fundo |
| 🎬 Vídeo     | cutscenes, animações, vídeos de abertura   |
| 🔤 Fonte     | fontes utilizadas na interface             |
| 🧊 Modelo 3D | personagens, objetos, cenários             |
| ✨ Efeitos    | partículas, animações, shaders             |
| 🗺️ Dados    | mapas, fases, configurações, diálogos      |

Neste projeto, o foco está nos **assets de áudio**.

A estrutura do repositório possui uma pasta:

```text
tunes/
```

que contém os arquivos de som utilizados pelo piano. O repositório atualmente possui essa pasta juntamente com `index.html`, `script.js`, `style.css` e `README.md`.

---

# 🎵 Assets de áudio

Um piano digital precisa de algo que represente o som de cada nota.

Uma possibilidade seria gerar o som matematicamente utilizando uma API de áudio.

Outra possibilidade, utilizada neste projeto, é trabalhar com **arquivos de áudio pré-gravados**.

A ideia é simples:

```text
Tecla A
  ↓
arquivo a.wav
  ↓
reprodução do áudio
```

O código utiliza um objeto `Audio`:

```javascript
let audio = new Audio("../tunes/a.wav");
```

Depois, quando uma tecla é pressionada, o caminho do arquivo é alterado:

```javascript
audio.src = `../tunes/${tecla}.wav`;
```

Assim, o valor de `tecla` determina qual asset será carregado.

---

# 🧩 Asset como parte do conteúdo do jogo

É importante perceber que o arquivo `.wav` **não é código**.

Ele é um recurso externo utilizado pelo código.

Podemos separar os dois conceitos:

```text
                 PROJETO
                    │
          ┌─────────┴─────────┐
          │                   │
        CÓDIGO              ASSETS
          │                   │
          │                   └── a.wav
          │                   └── b.wav
          │                   └── c.wav
          │                   └── ...
          │
          ├── identifica tecla
          ├── recebe evento
          ├── escolhe arquivo
          └── reproduz áudio
```

O JavaScript determina **quando e qual asset utilizar**.

O arquivo de áudio fornece **o conteúdo sonoro**.

Essa separação é muito comum no desenvolvimento de jogos.

---

# 🔗 Código + Asset

Uma das ideias mais importantes deste projeto é compreender que o código pode construir o caminho para um asset dinamicamente.

Observe:

```javascript
audio.src = `../tunes/${tecla}.wav`;
```

Se:

```javascript
tecla = "a"
```

o código procura:

```text
../tunes/a.wav
```

Se:

```javascript
tecla = "w"
```

o código procura:

```text
../tunes/w.wav
```

E assim por diante.

Podemos representar:

```text
evento
  ↓
qual tecla?
  ↓
"w"
  ↓
montar caminho
  ↓
../tunes/w.wav
  ↓
carregar asset
  ↓
reproduzir áudio
```

Isso permite utilizar uma única função para trabalhar com vários arquivos.

---

# 🗂️ Organização dos Assets

Uma prática importante em projetos de Jogos Digitais é manter os assets organizados.

Neste projeto:

```text
piano/
│
├── index.html
├── script.js
├── style.css
├── README.md
│
└── tunes/
    ├── a.wav
    ├── w.wav
    ├── s.wav
    ├── e.wav
    ├── d.wav
    ├── ...
    └── ç.wav
```

A pasta `tunes` possui uma responsabilidade clara:

> **armazenar os recursos de áudio utilizados pelo piano.**

Em um jogo maior, poderíamos encontrar uma estrutura semelhante:

```text
game/
│
├── index.html
├── script.js
├── style.css
│
├── assets/
│   ├── images/
│   ├── audio/
│   ├── fonts/
│   └── videos/
│
└── data/
```

A organização pode variar de acordo com o projeto, mas a ideia central permanece:

> **separar os recursos do projeto de sua lógica de programação.**

---

# 🎮 Assets em Jogos Digitais

Em um jogo, praticamente tudo que o jogador percebe pode depender de algum tipo de asset.

Imagine um personagem andando:

```text
PERSONAGEM
   │
   ├── sprite/imagem
   ├── animação
   ├── efeito sonoro
   └── dados de configuração
```

Quando ele pula:

```text
evento de entrada
      ↓
código identifica o comando
      ↓
personagem muda de estado
      ↓
animação é executada
      ↓
som de pulo é reproduzido
```

Os assets participam da experiência, mas **o código determina como e quando eles são utilizados**.

No piano acontece algo semelhante:

```text
jogador
  ↓
pressiona "A"
  ↓
evento keydown
  ↓
tocarTecla()
  ↓
tocarNota("a")
  ↓
a.wav
  ↓
som da nota
```

---

# 🧠 Assets não são apenas arquivos

É tentador pensar:

> "Asset é simplesmente uma imagem ou um áudio."

Para o desenvolvimento de jogos, podemos ampliar essa ideia.

Um asset é um **recurso produzido, adquirido ou preparado para ser utilizado dentro do projeto**.

Isso envolve várias questões:

* onde o arquivo está armazenado;
* qual é seu formato;
* qual é seu tamanho;
* como ele será carregado;
* quando ele será utilizado;
* quem é responsável por sua criação;
* qual licença permite seu uso;
* como ele será nomeado;
* como outros sistemas encontrarão esse recurso.

Por isso, **gerenciamento de assets** é uma parte importante da produção de jogos.

---

# 📁 Caminhos para os Assets

O navegador precisa saber **onde encontrar o arquivo**.

O projeto utiliza um caminho para chegar aos arquivos de áudio:

```javascript
audio.src = `../tunes/${tecla}.wav`;
```

O conceito de caminho é fundamental.

Podemos ter:

### Caminho relativo

```text
tunes/a.wav
```

ou:

```text
../tunes/a.wav
```

### Caminho absoluto

```text
https://exemplo.com/audio/a.wav
```

Em projetos locais, é comum utilizar caminhos relativos para manter os assets dentro do próprio projeto.

---

# ⚠️ Um detalhe importante para investigar

Ao analisar o projeto, encontramos:

```javascript
new Audio("../tunes/a.wav");
```

e:

```javascript
audio.src = `../tunes/${tecla}.wav`;
```

Como `index.html` está na raiz do repositório e a pasta `tunes` também está na raiz, vale a pena observar cuidadosamente se o caminho esperado deveria ser:

```text
tunes/a.wav
```

em vez de:

```text
../tunes/a.wav
```

Isso é uma excelente oportunidade de aprendizagem.

Quando um asset não é encontrado, o problema pode não estar no arquivo de áudio. Pode estar no **caminho utilizado pelo código para localizá-lo**.

Uma forma de investigar é utilizar as ferramentas de desenvolvedor do navegador e observar a aba **Network/Rede**.

---

# 🔍 Investigando um Asset que não carrega

Quando um recurso não funciona, siga uma sequência de investigação.

### 1. O arquivo existe?

Verifique:

```text
tunes/
   └── a.wav
```

---

### 2. O nome está correto?

Compare:

```text
a.wav
```

com:

```text
A.wav
```

Dependendo do ambiente, maiúsculas e minúsculas podem fazer diferença.

---

### 3. O caminho está correto?

Verifique:

```javascript
audio.src = "...";
```

---

### 4. O navegador conseguiu carregar o arquivo?

Abra as ferramentas de desenvolvedor e observe:

```text
Network
   ↓
a.wav
```

---

### 5. O formato é suportado?

O projeto utiliza arquivos `.wav`.

Outros formatos comuns incluem:

```text
.wav
.mp3
.ogg
```

A escolha do formato pode envolver questões de compatibilidade, qualidade e tamanho do arquivo.

---

# 🎚️ Assets e propriedades do recurso

O projeto também permite controlar o volume:

```javascript
function controlarVolume(evento) {
    audio.volume = evento.target.value;
}
```

O valor do controle deslizante é utilizado para modificar uma propriedade do objeto `Audio`.

Temos então:

```text
Asset
  ↓
a.wav
  ↓
objeto Audio
  ↓
volume
  ↓
reprodução
```

Isso mostra uma diferença importante:

> O asset contém o recurso; o código controla **como o recurso será utilizado**.

---

# 🖱️ Asset + Evento

Este projeto também é uma ótima oportunidade para relacionar o conceito de **assets** ao conceito de **eventos** estudado no projeto anterior.

Quando o jogador clica em uma tecla:

```javascript
tecla.addEventListener("click", function () {
    tocarNota(tecla.dataset.key);
});
```

O evento `click` provoca a execução de `tocarNota()`.

Podemos visualizar:

```text
                 EVENTO
                   │
                   ▼
              usuário clica
                   │
                   ▼
                click
                   │
                   ▼
              tocarNota()
                   │
                   ▼
           identifica a tecla
                   │
                   ▼
          localiza o asset
                   │
                   ▼
                a.wav
                   │
                   ▼
             reproduz áudio
```

O mesmo acontece com o teclado:

```javascript
document.addEventListener("keydown", tocarTecla);
```

A função verifica se a tecla pressionada está entre as teclas válidas e, caso esteja, chama `tocarNota()`.

---

# 🎹 Um asset para cada tecla

O projeto utiliza uma convenção bastante interessante:

```text
tecla visual
    ↓
data-key
    ↓
nome do asset
```

Por exemplo:

```text
data-key="a"
     ↓
a.wav
```

```text
data-key="w"
     ↓
w.wav
```

Isso cria uma relação direta entre a interface e os arquivos.

Podemos representar:

```text
┌─────────────┐       ┌─────────────┐
│   HTML      │       │   ASSETS    │
│             │       │             │
│ data-key=a  │ ────► │    a.wav    │
│ data-key=w  │ ────► │    w.wav    │
│ data-key=s  │ ────► │    s.wav    │
│ data-key=e  │ ────► │    e.wav    │
└─────────────┘       └─────────────┘
          ▲
          │
          │
      JavaScript
```

Essa estratégia é muito utilizada em jogos porque permite criar **convenções de nomenclatura** que facilitam a localização dos recursos.

---

# 🧪 Atividade 1 — Adicionando um novo asset

Adicione um novo arquivo de áudio à pasta:

```text
tunes/
```

Por exemplo:

```text
tunes/teste.wav
```

Depois, investigue como o JavaScript poderia localizar esse arquivo.

Perguntas:

1. Qual informação identifica o asset?
2. Como o código constrói o caminho?
3. O nome do arquivo precisa seguir alguma convenção?
4. O que acontece se o arquivo não existir?

---

# 🧪 Atividade 2 — Troque um asset

Escolha uma das notas e substitua seu arquivo `.wav` por outro áudio.

Por exemplo:

```text
a.wav
```

pode ser substituído por outro arquivo compatível.

Observe:

* o código precisou ser alterado?
* o comportamento do programa mudou?
* a interface precisou ser alterada?
* o que aconteceu com a experiência do usuário?

Essa atividade ajuda a perceber que **conteúdo e lógica podem ser tratados separadamente**.

---

# 🧪 Atividade 3 — Crie uma pasta para diferentes tipos de assets

Modifique a organização do projeto para algo como:

```text
assets/
│
├── audio/
├── images/
└── fonts/
```

Depois mova os arquivos de áudio para:

```text
assets/audio/
```

Agora será necessário atualizar os caminhos utilizados pelo JavaScript.

Essa atividade permite observar uma questão importante:

> Alterar a organização física dos assets pode exigir alterações no código que referencia esses recursos.

---

# 🧪 Atividade 4 — Asset inexistente

Altere propositalmente:

```javascript
audio.src = `../tunes/${tecla}.wav`;
```

para um caminho incorreto.

Depois execute o projeto e investigue:

* o que acontece?
* aparece algum erro no console?
* aparece alguma requisição com erro na aba Network?
* o restante da aplicação continua funcionando?
* qual parte do sistema deixou de funcionar?

Essa atividade é especialmente útil para desenvolver habilidades de **debugging**.

---

# 🧪 Atividade 5 — Crie um novo instrumento

Agora imagine que o projeto não seja mais um piano.

Crie uma segunda coleção de assets:

```text
tunes/
    piano/
    guitar/
```

ou:

```text
assets/
    piano/
    guitar/
```

O objetivo é permitir que o código escolha qual conjunto de sons utilizar.

O fluxo poderia ser:

```text
instrumento escolhido
        ↓
pasta correspondente
        ↓
tecla pressionada
        ↓
asset correspondente
        ↓
reprodução
```

Essa atividade introduz uma ideia importante para projetos maiores:

> **O código pode trabalhar com diferentes conjuntos de assets sem precisar ser completamente reescrito.**

---

# 🧠 Perguntas para discussão

Durante a análise do projeto, tente responder:

1. O que é um asset?
2. Qual é a diferença entre um asset e um código-fonte?
3. Por que os arquivos de áudio estão separados do `script.js`?
4. Qual é a função da pasta `tunes`?
5. Como o JavaScript descobre qual arquivo de áudio deve reproduzir?
6. O que representa o `data-key`?
7. Por que a nomenclatura dos arquivos é importante?
8. O que acontece se `a.wav` for removido?
9. O que acontece se o arquivo existir, mas o caminho estiver incorreto?
10. Por que um jogo precisa de uma boa organização de assets?
11. Que outros tipos de assets podemos encontrar em um jogo?
12. Como poderíamos organizar os assets de um jogo muito maior?
13. Qual é a relação entre eventos e assets neste projeto?
14. Um asset precisa necessariamente ser um arquivo? Que outros tipos de recursos podem participar de um projeto?
15. Quem produz os assets de um jogo profissional?

---

# 🎓 Objetivos de aprendizagem

Ao analisar e modificar este projeto, espera-se que o estudante seja capaz de:

* compreender o conceito de **asset**;
* identificar diferentes tipos de assets;
* reconhecer assets de áudio em um projeto;
* compreender a relação entre código e recursos externos;
* organizar assets em diretórios;
* utilizar caminhos relativos para acessar recursos;
* compreender convenções de nomenclatura;
* relacionar eventos à utilização de assets;
* identificar problemas relacionados ao carregamento de recursos;
* utilizar ferramentas do navegador para investigar assets;
* compreender a importância do gerenciamento de recursos em Jogos Digitais.

---

# 🎮 Assets como parte da experiência do jogador

Uma maneira interessante de compreender a importância dos assets é imaginar o projeto sem eles.

Temos:

```text
HTML
+
CSS
+
JavaScript
```

O teclado aparece.

Os eventos funcionam.

As funções são executadas.

Mas não temos os arquivos de áudio.

O resultado seria uma interface que **parece um piano, mas não produz a experiência sonora esperada**.

Agora imagine o contrário:

```text
vários arquivos de áudio
```

mas nenhum código para utilizá-los.

Os recursos existem, mas o jogador não consegue interagir com eles.

Por isso:

```text
        ASSETS
           +
         CÓDIGO
           +
       INTERAÇÃO
           ↓
     EXPERIÊNCIA
       DO JOGADOR
```

No desenvolvimento de Jogos Digitais, esses elementos trabalham juntos.

---

# 🔄 Do asset ao jogador

Podemos resumir o funcionamento deste projeto em um fluxo:

```text
┌──────────────────┐
│     JOGADOR      │
└────────┬─────────┘
         │
         │ tecla / clique
         ▼
┌──────────────────┐
│      EVENTO      │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│    JAVASCRIPT    │
│                  │
│ identifica tecla │
└────────┬─────────┘
         │
         │ monta caminho
         ▼
┌──────────────────┐
│      ASSET       │
│                  │
│     a.wav        │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│    REPRODUÇÃO    │
│      DO SOM      │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│    EXPERIÊNCIA   │
│    DO JOGADOR    │
└──────────────────┘
```

Essa é a principal ideia que este projeto pretende demonstrar:

> **Um asset só se torna parte da experiência do jogo quando o código sabe como encontrá-lo e quando utilizá-lo.**

---

# 🚀 Próximos passos

Depois de compreender os assets utilizados neste piano, o projeto pode ser expandido para explorar outros conceitos:

* adicionar imagens e ícones;
* adicionar diferentes instrumentos;
* adicionar efeitos sonoros;
* adicionar músicas de fundo;
* criar um sistema de carregamento de assets;
* criar uma tela de carregamento;
* pré-carregar os arquivos de áudio;
* organizar os recursos em diferentes categorias;
* criar um sistema de configuração dos assets;
* substituir os arquivos `.wav` por outro formato;
* criar uma biblioteca de sons;
* adicionar animações às teclas;
* utilizar sprites ou imagens para representar elementos visuais.

Em projetos maiores, o gerenciamento de assets se torna uma parte importante da arquitetura do jogo.

---

# 📌 Estrutura do projeto

Atualmente, o projeto possui uma estrutura simples:

```text
piano/
│
├── index.html      # Estrutura da aplicação
├── script.js       # Lógica e interação
├── style.css       # Apresentação visual
├── README.md       # Documentação
│
└── tunes/          # Assets de áudio
    └── *.wav
```

O `index.html` define a interface e as teclas do piano, enquanto o `script.js` trata das interações, do controle de volume, da reprodução dos sons e da associação entre teclas e arquivos de áudio.

---

# 💡 Uma ideia central para levar da atividade

No desenvolvimento de Jogos Digitais, o código não é o jogo inteiro.

Um projeto é construído pela combinação de diferentes elementos:

```text
             PROJETO
                │
      ┌─────────┼─────────┐
      │         │         │
    CÓDIGO    ASSETS   INTERAÇÃO
      │         │         │
      └─────────┼─────────┘
                │
                ▼
       EXPERIÊNCIA DO JOGADOR
```

Os **assets** fornecem imagens, sons, músicas, modelos, animações e outros recursos que compõem o conteúdo do projeto.

O **código** define as regras e determina como esses recursos serão utilizados.

A **interação** conecta o jogador ao sistema.

Neste piano:

```text
tecla pressionada
       ↓
     evento
       ↓
   JavaScript
       ↓
   localiza asset
       ↓
     a.wav
       ↓
    reproduz som
```

Esse pequeno projeto permite, portanto, estudar uma ideia que aparece constantemente na produção profissional de jogos:

> **Desenvolver um jogo não é apenas programar suas regras. É também organizar, gerenciar e integrar os recursos que dão forma à experiência do jogador.**
