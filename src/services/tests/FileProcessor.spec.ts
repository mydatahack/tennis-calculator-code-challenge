import { expect } from 'chai';
import path from 'path';
import { FileProcessor } from '../FileProcessor';

describe('FileProcessor', () => {
  describe('processFileToArray()', () => {

    it('should create array from the file', () => {
      const fileProcessor = new FileProcessor(path.join(__dirname, './test-data/test_tournament.txt'));
      const expectedOutput = ['Match: 01', 'Person A vs Person B', '0', '0', '0'];
      expect(fileProcessor.processFileToArray()).to.be.deep.equal(expectedOutput);
    });
  });
});