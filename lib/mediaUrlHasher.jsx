import { Blocklock, encodeCiphertextToSolidity } from "blocklock-js";
import { AbiCoder } from "ethers";

export default function mediaUrlHasher(url) {   
    const blocklockjs = new Blocklock(
        accounts,
        "0xfF66908E1d7d23ff62791505b2eC120128918F44"
      );
    const msgBytes = AbiCoder.defaultAbiCoder().encode(["string"], [value]);
    const encodedMessage = ethers.getBytes(msgBytes);
    console.log("mediaUrlHasher", url);
    const blockHeight  = BigInt(15122004); 
    const ciphertext = blocklockjs.encrypt(encodedMessage, blockHeight);
    return ciphertext;
}