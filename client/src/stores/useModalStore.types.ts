import { extend } from '@vue/shared';

const component = extend({});
type VueComponent = InstanceType<typeof component>;

export type ModalProps = {
    component: null | VueComponent;
    options: {
        title?: string;
        blockClose?: boolean;
        contentProps?: object;
    }
}

export type ModalState = {
    modalState: ModalProps;
}
