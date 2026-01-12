
const PRIMARY_COLOR = 'linear-gradient(to right, #047857, #065f46)'; // unsorted
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

    bar1.style.backgroundImage = 'linear-gradient(to right, #ef4444, #dc2626)';
    bar2.style.backgroundImage = 'linear-gradient(to right, #ef4444, #dc2626)';

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


            bar1.style.backgroundImage = PRIMARY_COLOR;
            bar2.style.backgroundImage = PRIMARY_COLOR;
            resolve();
        }, speed * 0.4);

    }, speed * 3);




};
export default animateSwap;
