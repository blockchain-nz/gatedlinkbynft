# Demo URL to try out:
http://ec2-3-25-230-254.ap-southeast-2.compute.amazonaws.com:3000/ 

A demo vedio: https://www.blockchain.nz/mintgate.html 

# Design:
Use React for frontend, Express for backend.
## Backend
Use MintGate API to fetch all the GatedLinks. This is mainly to mask username and uid of MintGate. Could be used to customize/filtering as well.
## Frontend
Deal with MetaMask login to get eth address and chainid  
Call Backend API to get GatedLink list (with MintGate username and uid masked)  
Use web3 to check the balance for specific NFT owned by the address and filter the GatedLinks based on the minimal balance threshold.  
Show the GatedLinks title/image/url, only show the eligible ones (could also show the non eligible ones in grey with NFT's etherscan url as well since the information also returned from Backend)  
Once user click the image, the GatedLink url will be opened in another tab.  

# Test data:
## Created GatedLinks in MintGate:
one Gatedlink need 1 NFT A  
one Gatedlink need 2 NFT A  
one Gatedlink need 4 NFT A  
one Gatedlink need 1 NFT B  
one Gatedlink need 1 NFT C  

## Two ethereum addresses
XXX, has 3 of NFT A, 1 of NFT B, 0 of NFT C on eth mainnet.  
YYY, has no NFT  

# Scenario:
connect wallet with eth mainnet and choose address XXX. GatedLinks #1, #2, #4 will be shown. #3, #5 will not be shown. (the NFT minbal of GatedLinks got from MintGate API shown correct value as of 28/10/2021. While, it return 1 for all links. So #4 also shown in this scenario)  
connect wallet with eth mainnet and choose address YYY. No GatedLinks will be shown.  
connect wallet with other network and choose address XXX. No GatedLinks will be shown.  
