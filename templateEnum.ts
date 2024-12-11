import {Address} from "@graphprotocol/graph-ts";


export const ContractAddress = "{{nftitem.address}}".toLowerCase()


export namespace ContractAddressConst {
    export const ZERO = "0x0000000000000000000000000000000000000000"
    export const WETH9 = "0x59541A6A47C410270BF419aCabe40963d75Fce5D"
    export const erc721marketplace = "{{erc721marketplace.address}}".toLowerCase()
    export const erc1155marketplace = "{{erc1155marketplace.address}}".toLowerCase()
}