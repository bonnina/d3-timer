import * as React from 'react';
import * as d3 from "d3";

interface IProps {
  progress: number;
}

class Circle extends React.Component<IProps, {}> {
  ref: SVGGElement;

  componentDidMount() {
    this.draw();
  }

  componentDidUpdate() {
    this.redraw();
  }

  public percentage: number = Math.PI * 2;

  public draw(): void {
    const context = this.setContext();
    this.setBackground(context);
    this.setForeground(context);
  }

  public redraw(): void {
    const context: any = d3.select('#d3-circle');
    context.remove();
    this.draw();
  }

  public setContext() {
    return d3.select(this.ref).append('svg')
      .attr('height', '350px')
      .attr('width', '350px')
      .attr('id', 'd3-circle')
      .append('g')
      .attr('transform', `translate(175, 175)`);
  }

  public setBackground(context: any) {
    return context.append('path')
    .datum({ endAngle: this.percentage })
    .style('fill', '#f2f2f2')   
    .attr('d', this.circle()); 
  }

  public circle() {
    return d3.arc()
      .innerRadius(140)
      .outerRadius(152)
      .startAngle(0)
  }

  public setColor(): string {
    const { progress } = this.props;
    switch(true) {
      case (progress >= 0.95):
        return '#d279a6';

      case (progress >= 0.75):
        return '#d98cb3';

      case (progress >= 0.5):
        return '#df9fbf';

      case (progress >= 0.25):
        return '#e6b3cc'; 

      default:
        return '#ecc6d9';
    }
  }
  
  public setForeground(context: any) {
    const { progress } = this.props;
    return context.append('path')
      .datum({ endAngle: this.percentage * progress })
      .style('fill', this.setColor())
      .attr('d', this.circle());
  }

  public render() {
    return <g className='timer' ref={(ref: SVGGElement) => this.ref = ref}/>
  }
}
export default Circle;
