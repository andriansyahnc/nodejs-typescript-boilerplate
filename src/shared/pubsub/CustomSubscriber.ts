import CustomListener from "./CustomListener";

class CustomSubscriber {
    customListener: CustomListener;

    constructor() {
        this.customListener = new CustomListener();
    }

    start() {
        this.customListener.listen().catch(console.error);
    }
}

export default CustomSubscriber;