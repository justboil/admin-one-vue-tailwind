export default function (event: string, listener: any) {
    onBeforeMount(() => {
        window.addEventListener(event, listener);
    });

    onMounted(() => {
        listener();
    });

    onBeforeUnmount(() => {
        window.removeEventListener(event, listener);
    });
}