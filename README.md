# GoodPrompt: transparent, decentralized, peer-reviewed data submissionA

We introduce an on-chain peer-review process for AI training data. The process enhances AI's transparency, privacy safeguards, accuracy, cost-efficiency, and trustworthiness. The peer-review process is similar to scientific publishing. First, an author submits a data object, which may contain an instructional prompt, context, licenses, and response. Then, reviewers can accept, refer to an expert, ask for improvement, or reject the data object. The final result is a dataset of peer-reviewed data objects transparently stored on a trusted infrastructure such as decentralized ledger. Compensation for authors and reviewers will be governed by a smart-contract based on the authors' and reviewers' reputation and the quality of the submitted objects.

# Flow

![ux](visuals/ux.svg)

# UI
1. Grant view:
    1. create:
        1. input text: name
        1. input text: description / motivation
        1. input text: constitution / guide
        1. input text x3: examples
        1. button: create a grant
    1. add funds:
        
1. author view:

    1. manual: enter  context,instruction,response,source
    1. LLM parsing: drop in a file (discord or emails) and LLM figures out the list of data points {context,instruction,response,source}
    1. dashboard that shows data, income and progress

1. reviewer view
    1. data object card:
        1. displays the data object {context,instruction,response,source}
        1. button accept (swipe right)
        1. button reject (swipe left)
        1. feedback (expands into a text field for feedback)
        1. refer to an expert button (expands into a field that takes the address or username of the expert, maybe suggestion list)
        1. skip
    1. status info such as rating, stats
    1. dashboard could be a tab or expand from status showing earnings, rating and so on

1. dataset explorer view
    1. search for datasets using graph protocol for a graph by description and tags
    1. show a table of teaching data objects. dispute button next to an object that expands into a feedback field

# Bounties

| category          | sponsor                              | prize                    | amount | our fit                                                                                                         | dificulty | priority |
|-------------------|--------------------------------------|--------------------------|--------|-----------------------------------------------------------------------------------------------------------------|-----------|----------|
| sign in           | Mask Nettwork                        | RelationService          | 6000   | connect to twitter and build a reputation                                                                       | 6         | 1        |
| sign in           | Cometh                               | The smoothest UX         | 3000   | easier login and interaction with the chain without signing every transaction                                   | 6         | 3        |
| sign in           | Sismo                                | overall                  | 2500   | sign in with min followers on github or twitter and maybe some privacy                                          | 10        | 3        |
| sign in           | Polygon ID                           | privacy id               | 2500   | login                                                                                                           | 4         | 3        |
| sign in           | Safe                                 | aa                       | 2500   | auth-kit login with email, onramp-kit pay using creditcard                                                      | 5         | 3        |
| sign in           | Safe                                 | protocol                 | 2500   | no signing swipes to keep nice ux or sign in the end                                                            | 4         | 3        |
| application llm   | Compound                             | Compound community use   | 5000   | create data and grant specifically for compound                                                                 | 4         | 2        |
| llm & filestorage | Filecoin                             | Grand Prize              | 2500   | create structured prompt data objects with lillypad fastchat, fvm to programatically create a dataset           | 10        | 3        |
| compute           | chainlink                            | functions                | 1500   | use function to run llm or cos similarity                                                                       | 6         | 5        |
| llm distance      | cartesi (no-sponsor)                 | --                       | --     | check distance of the new submission to encourage diversity and alignment                                       | 7         | 3        |
| notification      | Push Protocol                        | Pushing boundaries / All | 1200   | notify reviewers that they were chosen through notification or chat. can also use gating for approved reviewers | 3         | 3        |
| notification      | Push Protocol                        | chat                     | 1800   | send a message from a reviewer to the author with request for changes                                           | 3         | 3        |
| messages          | XMTP                                 | LIT claimable keys       | 1500   | claim a wallet over email. could be used to invite authors and reviewers                                        | 6         | 2        |
| messages          | XMTP                                 | best use                 | 250    | group chat between authors and reviewers                                                                        | 5         | 2        |
| voting            | UMA                                  | optimistic oracle        | 5000   | submit the data  object to UMA so they can handle disputes and voting                                           | 10        | 1        |
| blind voting      | aztec                                | use noir library         | 2000   | use noir library to do blind voting                                                                             | 10        | 5        |
| manage key-pairs  | Lit Protocol                         | Programmatic Signing     | 2000   | revealing votes after everyone voted or enough time has passed                                                  | 6         | 3        |
| data              | graph                                | Best New Graph           | 1400   | index the onchain reviewing data and easily create the training dataset                                         | 7         | 2        |
| data              | tableland                            | studio                   | 1000   | put data into sql and createa the training dataset                                                              | 7         | 3        |
| UX                | Mantle                               | best UX                  | 1250   | deploy on Mantle                                                                                                | 2         | 0        |
| lend              | spark                                | SparkLend                | 4000   | authors and reviewers can get paid in usdc while the grant is in ETH                                            | 10        | 60       |
| cross-chain       | connext, hyperlane, wormhole, axelar | --                       | --     | transfer data between chains (fvm), create our own cheaper data chain and transfer from it                      | 10        | 6        |



Deployment chains:

| chain   | prize amount | notes                                       |
|---------|--------------|---------------------------------------------|
| polygon | 2500         | public good with account abstraction {safe} |
| scroll  | 2000         | zk evm should be trivial change of RPC      |
| Mantle  | 2.500 pool   | need to tweet                               |


Tokens:

| token   | prize amount | notes                                      |
|---------|--------------|--------------------------------------------|
| ApeCoin | 3000         | consumer or innovative use case            |
| connext | 1500         | deploy and use xerc20 (extension of erc20) |


.env file in root for deploying smart contract - 
PRIVATE_KEY= (dataset owner address)
ALCHEMY_API_KEY=RHhC7o6uOWm8N0q7zLHJKpwkMZoiKyUG
CONTRACT_ADDRESS=0xb3fBCd330499d12C91e30D6e5118e74B355ca135
WALLET_ADDRESS=0x61bbB116879ac169A8D50d20E1E9867Ead619BCC