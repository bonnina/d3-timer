import * as React from 'react';
import * as d3 from "d3";

interface Props {
  progress: number;
}

class Circle extends React.Component<Props, {}> {
  ref: SVGGElement;

  componentDidMount() {
    this.draw();
  }

  componentDidUpdate() {
    this.redraw();
  }

  public draw() {
    const context = this.setContext();
    this.setBackground(context);
    this.setForeground(context);
  }

  public redraw() {
    const context: any = d3.select('#d3-circle');
    context.remove();
    this.draw();
  }

  public setContext() {
    return d3.select(this.ref).append('svg')
      .attr('height', '310px')
      .attr('width', '310px')
      .attr('id', 'd3-circle')
      .append('g')
      .attr('transform', `translate(155, 155)`);
  }

  public setBackground(context: any) {
    return context.append('path')
    .datum({ endAngle: this.percentage })
    .style('fill', '#e6e6e6')   
    .attr('d', this.circle()); 
  }

  public percentage: number = Math.PI * 2;

  public circle() {
    return d3.arc()
      .innerRadius(100)
      .outerRadius(110)
      .startAngle(0)
  }
  
  public setForeground(context: any) {
    const { progress } = this.props;
    return context.append('path')
      .datum({ endAngle: this.percentage * progress })
      .style('fill', '#ffb3b3')
      .attr('d', this.circle());
  }

  public render() {
    return <g className='timer' ref={(ref: SVGGElement) => this.ref = ref}/>
  }
}
export default Circle;
