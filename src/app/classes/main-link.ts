export class MainLink {
  directory: string = '../../../../assets/img/menu/';
  path: string = 'main-link-path';
  alt: string = 'main-link-alt';
  text: string = 'main-link-text';

  constructor(link?: any) {
    this.path = link ? this.getPath(link.fileName) : 'main-link-path';
    this.alt = link ? link.fileName : 'main-link-alt';
    this.text = link ? link.text : 'main-link-text';
  }

  getPath(fileName: string) {
    return (this.path = this.directory + fileName + '.svg');
  }
}
