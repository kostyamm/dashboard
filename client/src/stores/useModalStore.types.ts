import { extend } from '@vue/shared';

const component = extend({});
type VueComponent = InstanceType<typeof component>;

export type IModalProps = {
    component: null | VueComponent;
    props?: object;
}

export type IModalState = {
    modalState: IModalProps;
}
