import { EventEmitter } from "events";
import * as lightning from "lightning";
import { AuthenticatedLnd, payViaPaymentRequest } from "lightning";

export const NodeEvents = {
  invoiceUpdated: "invoice-updated",
  invoicePaid: "invoice-paid",
  bountyCreated: "bounty-created",
};

class Lightning extends EventEmitter {
  private lnd: AuthenticatedLnd | null = null;
  public pubkey: string | null = null;

  getLnd(): AuthenticatedLnd {
    if (!this.lnd) {
      throw new Error("Not Authorized. You must login first!");
    }

    return this.lnd;
  }

  async connect() {
    try {
      const { lnd } = await lightning.authenticatedLndGrpc({
        macaroon: process.env.MACAROON,
        socket: process.env.HOST,
      });

      const msg = Buffer.from("authorization test").toString("base64");

      await lightning.signMessage({
        lnd,
        message: msg,
      });

      const { public_key } = await lightning.getIdentity({ lnd });

      console.log("connected lnd");

      this.lnd = lnd;
      this.pubkey = public_key;
    } catch (err) {
      console.log({ err });
    }

    return;
  }

  async reconnectNode() {
    const node = process.env.NODE_PUBKEY;
    const host = process.env.HOST;

    if (!node || !host) {
      console.error(`Failed to reconnect to LND node, couldn't find your node`);
      return;
    }

    try {
      console.log(`Reconnecting to LND node ${host}`);
      await this.connect();
    } catch (error) {
      console.error(`Failed to reconnect to LND node ${host}`);
    }
  }
}

export default new Lightning();
