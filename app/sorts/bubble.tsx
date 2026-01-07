
const PRIMARY_COLOR = '#2a4b27';
const animateSwap = async (
    i: number,
    j: number,
    speed: number,
    onSwap: () => void
) => {
    const bars = document.getElementsByClassName('array-bar') as HTMLCollectionOf<HTMLElement>;
    const bar1 = bars[i];
    const bar2 = bars[j];

    const barWidth = bar1.offsetWidth;
    const margin = 4;
    const totalWidth = barWidth + margin;

    bar1.style.backgroundColor = '#ef4444';
    bar2.style.backgroundColor = '#ef4444';

    bar1.style.transition = `transform ${speed}ms ease`;
    bar2.style.transition = `transform ${speed}ms ease`;

    bar1.style.transform = 'translateY(-40px)';
    bar2.style.transform = 'translateY(40px)';

    setTimeout(() => {

        bar1.style.transform = `translate(${totalWidth}px, -40px)`;
        bar2.style.transform = `translate(${-totalWidth}px, 40px)`;
    }, speed);
    setTimeout(() => {

        bar1.style.transform = `translateX(${totalWidth}px)`;
        bar2.style.transform = `translateX(${-totalWidth}px)`;
    }, speed * 2);

    setTimeout(() => {
        bar1.style.transform = '';
        bar2.style.transform = '';
        bar1.style.transition = '';
        bar2.style.transition = '';
        onSwap();

        setTimeout(() => {


            bar1.style.backgroundColor = PRIMARY_COLOR;
            bar2.style.backgroundColor = PRIMARY_COLOR;
            resolve();
        }, speed * 0.4);

    }, speed * 3);




};
export default animateSwap;
