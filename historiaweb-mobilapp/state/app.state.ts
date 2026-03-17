import Tortenet from '@/models/tortenet.model';
let _selectedTelepules: string|null = null;
let _selectedTortenet:Tortenet|null=null;
export default function selectTelepulesek(telepules: string) {
  _selectedTelepules = telepules;
}

export function getSelectedTelepules() {
  return _selectedTelepules;
}

export function selectTortenet(tortenet:Tortenet):void {
  _selectedTortenet=tortenet;
}
export function getSelectedTortenet() {
  return _selectedTortenet;
}