export type Modal = {
    id: number,
    $resolve: (result: unknown) => unknown,
    component: string,
    props?: object
}