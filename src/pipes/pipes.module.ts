import { NgModule } from '@angular/core';
import { CustomPipe } from './custom/custom';
@NgModule({
	declarations: [CustomPipe],
	imports: [],
	exports: [CustomPipe]
})
export class PipesModule {}
