import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-ai-model-select',
  templateUrl: './ai-model-select.component.html'
})
export class AiModelSelectComponent {
  @Input() selectedModel: string = 'gpt-4o';
  @Output() modelChange = new EventEmitter<string>();

  models = [
    { value: 'gpt-4o', label: 'GPT-4o (高精度)' },
    { value: 'gpt-4o-mini', label: 'GPT-4o mini (軽量)' },
    { value: 'gemini-1.5-flash', label: 'Gemini 1.5 Flash' }
  ];

  onModelChange(value: string) {
    this.selectedModel = value;
    this.modelChange.emit(value);
  }
}
